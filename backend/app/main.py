from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
from dotenv import load_dotenv
import uuid
import os
from .models import ItineraryRequest, ItineraryResponse
from .ai_engine import AIEngine
from .flight_api import FlightAPI
from .weather_api import WeatherAPI
from .database import get_db, Itinerary, init_db
from .data.recommendations import get_hotel_recommendations, get_car_rental_recommendations

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Travel Planner API")

# Get allowed origins from environment variable
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173")
allowed_origins_list = [origin.strip() for origin in ALLOWED_ORIGINS.split(",")]

# Get frontend URL for production (if set)
FRONTEND_URL = os.getenv("FRONTEND_URL")
if FRONTEND_URL and FRONTEND_URL not in allowed_origins_list:
    allowed_origins_list.append(FRONTEND_URL)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
ai_engine = AIEngine()
flight_api = FlightAPI()
weather_api = WeatherAPI()

@app.on_event("startup")
def startup():
    """Initialize database on startup"""
    init_db()

@app.get("/")
async def root():
    return {
        "message": "AI Travel Planner API",
        "version": "1.0.0",
        "status": "operational",
        "features": {
            "ai_itinerary": True,
            "flights": True,
            "weather": True,
            "location_search": True,
            "database": os.getenv("DATABASE_URL") is not None
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

def convert_dates_to_strings(obj):
    """Recursively convert date objects to ISO format strings"""
    if isinstance(obj, dict):
        return {k: convert_dates_to_strings(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_dates_to_strings(item) for item in obj]
    elif hasattr(obj, 'isoformat'):
        return obj.isoformat()
    else:
        return obj

@app.post("/api/itinerary/generate", response_model=ItineraryResponse)
async def generate_itinerary(
    request: ItineraryRequest,
    db: Session = Depends(get_db)
):
    """
    Generate a complete travel itinerary with real data
    """
    try:
        # Convert request to dict for AI
        prefs_dict = request.preferences.dict()
        prefs_dict["start_date"] = request.preferences.start_date.isoformat()
        prefs_dict["end_date"] = request.preferences.end_date.isoformat()
        
        print(f"📝 Generating itinerary for {prefs_dict['destination']}...")
        
        # Generate itinerary with AI
        itinerary = await ai_engine.generate_itinerary(prefs_dict)
        
        # Add real-time weather data
        if request.include_weather and request.preferences.destination:
            days = (request.preferences.end_date - request.preferences.start_date).days + 1
            print(f"🌤️ Fetching weather for {request.preferences.destination}...")
            
            weather = await weather_api.get_forecast(
                city=request.preferences.destination,
                days=min(days, 5)
            )
            
            if weather:
                print(f"✅ Got {len(weather)} weather forecasts")
                itinerary["weather"] = [w.dict() for w in weather]
            else:
                print(f"⚠️ No weather data returned")
                itinerary["weather"] = []
        
        # Add mock flights if requested
        if request.include_flights:
            origin = request.preferences.origin
            print(f"✈️ Fetching flights from {origin} to {request.preferences.destination}...")
            
            flights = await flight_api.search_flights(
                origin=origin,
                destination=request.preferences.destination,
                departure_date=request.preferences.start_date.isoformat(),
                return_date=request.preferences.end_date.isoformat(),
                adults=request.preferences.travelers
            )
            
            itinerary["flights"] = [f.dict() for f in flights]
        
        # Add hotel recommendations
        if request.include_hotels:
            hotels = get_hotel_recommendations(
                request.preferences.destination,
                itinerary.get("duration_days", 5)
            )
            itinerary["hotels"] = hotels

        # Add car rental recommendations
        if request.include_car_rentals:
            car_rentals = get_car_rental_recommendations(
                request.preferences.destination,
                itinerary.get("duration_days", 5)
            )
            itinerary["car_rentals"] = car_rentals


        # Generate a unique ID for this itinerary
        itinerary["id"] = str(uuid.uuid4())
        itinerary["created_at"] = datetime.now().isoformat()
        
        # Prepare data for database - convert all dates to strings
        preferences_for_db = convert_dates_to_strings(prefs_dict)
        itinerary_for_db = convert_dates_to_strings(itinerary)
        
        # Save to database (sync)
        db_itinerary = Itinerary(
            destination=request.preferences.destination,
            preferences=preferences_for_db,
            itinerary_data=itinerary_for_db
        )
        db.add(db_itinerary)
        db.commit()
        db.refresh(db_itinerary)
        
        itinerary["id"] = db_itinerary.id
        
        print(f"✅ Itinerary saved with ID: {db_itinerary.id}")
        
        return ItineraryResponse(**itinerary)
        
    except Exception as e:
        print(f"❌ Error generating itinerary: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/itinerary/{itinerary_id}")
async def get_itinerary(
    itinerary_id: str,
    db: Session = Depends(get_db)
):
    """Retrieve a saved itinerary"""
    itinerary = db.query(Itinerary).filter(Itinerary.id == itinerary_id).first()
    
    if not itinerary:
        raise HTTPException(status_code=404, detail="Itinerary not found")
    
    return itinerary.itinerary_data

@app.get("/api/locations/search")
async def search_locations(q: str, limit: int = 10, locale: str = "en"):
    """Search for airports and cities using real Skypicker data"""
    try:
        locations = await flight_api.search_locations(q, locale)
        
        formatted = []
        for loc in locations[:limit]:
            city_info = loc.get("city", {})
            country_info = city_info.get("country", {})
            
            formatted.append({
                "id": loc.get("id"),
                "name": loc.get("name"),
                "code": loc.get("code"),
                "type": loc.get("type"),
                "city": city_info.get("name"),
                "country": country_info.get("name"),
                "country_code": country_info.get("code"),
                "location": loc.get("location"),
                "full_name": f"{loc.get('name')}, {city_info.get('name')}, {country_info.get('name')}" if city_info.get('name') else loc.get('name')
            })
        
        return {"results": formatted}
    except Exception as e:
        print(f"Location search error: {e}")
        return {"results": []}

@app.get("/api/airlines")
async def get_airlines(limit: int = 50):
    """Get real airline data (names, codes)"""
    try:
        airlines = await flight_api.get_airlines()
        filtered = [a for a in airlines if a.get("type") == "airline"][:limit]
        return {"airlines": filtered}
    except Exception as e:
        print(f"Airlines error: {e}")
        return {"airlines": []}

@app.get("/api/test/weather")
async def test_weather(city: str = "Paris"):
    """Test weather API endpoint"""
    forecasts = await weather_api.get_forecast(city, days=3)
    return {
        "city": city,
        "forecasts": [f.dict() for f in forecasts],
        "count": len(forecasts)
    }

@app.get("/api/test/openai")
async def test_openai(city: str = "London"):
    """Test OpenAI connection"""
    try:
        response = await ai_engine.generate_itinerary({
            "destination": city,
            "budget": "moderate",
            "start_date": "2025-06-01",
            "end_date": "2025-06-03",
            "travelers": 2,
            "interests": ["art", "food"],
            "travel_style": "couple"
        })
        return {"success": True, "destination": response.get("destination")}
    except Exception as e:
        return {"success": False, "error": str(e)}
        
@app.get("/ping")
async def ping():
    return {"pong": datetime.now().isoformat()}