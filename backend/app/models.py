from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import date, datetime

# Request Models
class TravelPreferences(BaseModel):
    origin: str  
    destination: str  # Required now, no more "anywhere"
    budget: Literal["budget", "moderate", "luxury"] = "moderate"
    start_date: date
    end_date: date
    travelers: int = Field(1, ge=1, le=10)
    interests: List[str] = Field(default_factory=list)
    travel_style: Literal["solo", "couple", "family", "friends"] = "solo"
    special_requirements: Optional[str] = None

class ItineraryRequest(BaseModel):
    preferences: TravelPreferences
    include_flights: bool = True
    include_hotels: bool = True
    include_weather: bool = True
    include_car_rentals: bool = True

# Response Models
class FlightOffer(BaseModel):
    airline: str
    flight_number: str
    departure_airport: str
    arrival_airport: str
    departure_time: datetime
    arrival_time: datetime
    price: float
    currency: str = "USD"
    booking_link: Optional[str] = None

class HotelOffer(BaseModel):
    name: str
    address: str
    rating: float
    price_per_night: float
    total_price: float
    currency: str = "USD"
    amenities: List[str] = Field(default_factory=list)
    booking_link: Optional[str] = None
    image_url: Optional[str] = None
    distance_to_center: Optional[float] = None

class CarRental(BaseModel):
    company: str
    car_type: str
    price_per_day: float
    total_price: float
    currency: str = "USD"
    pickup_location: str
    dropoff_location: str
    booking_link: Optional[str] = None
    image_url: Optional[str] = None

class WeatherForecast(BaseModel):
    date: date
    condition: str
    temperature_high: float
    temperature_low: float
    precipitation_chance: float
    humidity: float
    wind_speed: float
    icon: str

class DailyActivity(BaseModel):
    time: str
    activity: str
    description: str
    location: Optional[str] = None
    duration_hours: float
    cost_estimate: float
    booking_required: bool = False

class DailyItinerary(BaseModel):
    day: int
    date: date
    activities: List[DailyActivity]
    meals: List[dict]
    accommodation: Optional[str] = None
    transportation_tips: Optional[str] = None

class ItineraryResponse(BaseModel):
    id: Optional[str] = None
    destination: str
    duration_days: int
    total_cost_estimate: float
    currency: str = "USD"
    daily_plans: List[DailyItinerary]
    flights: Optional[List[FlightOffer]] = None
    hotels: Optional[List[HotelOffer]] = None
    car_rentals: Optional[List[CarRental]] = None
    weather: Optional[List[WeatherForecast]] = None
    packing_list: List[str] = Field(default_factory=list)
    local_tips: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.now)