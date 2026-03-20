import os
import json
from typing import Dict, Any, List
from datetime import datetime, timedelta
from dotenv import load_dotenv
from openai import OpenAI

from .data.destinations import get_destination_content
from .data.recommendations import get_hotel_recommendations, get_car_rental_recommendations
from .utils.date_utils import calculate_days, generate_dates

# Load environment variables
load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class AIEngine:
    def __init__(self):
        self.model = "gpt-3.5-turbo"
        self.api_key = os.getenv("OPENAI_API_KEY")
        
        if not self.api_key:
            print("⚠️ WARNING: OPENAI_API_KEY not found in environment variables!")
    
    async def generate_itinerary(self, preferences: Dict[str, Any]) -> Dict[str, Any]:
        """Generate a travel itinerary using OpenAI or fallback"""
        
        try:
            response = client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are an expert travel planner. Create detailed, realistic travel itineraries based on user preferences. Always respond in JSON format."},
                    {"role": "user", "content": self._build_prompt(preferences)}
                ],
                response_format={"type": "json_object"},
                temperature=0.7,
                max_tokens=2000
            )
            
            itinerary = json.loads(response.choices[0].message.content)
            return self._validate_and_format(itinerary, preferences)
            
        except Exception as e:
            print(f"❌ AI Error: {e}")
            return self._get_fallback_itinerary(preferences)
    
    def _build_prompt(self, prefs: Dict[str, Any]) -> str:
        """Build prompt for OpenAI"""
        
        destination = prefs.get('destination', 'a popular travel destination')
        interests = ", ".join(prefs.get('interests', ['sightseeing']))
        start_date = prefs.get('start_date', '2025-04-01')
        end_date = prefs.get('end_date', '2025-04-07')
        
        return f"""
        Create a detailed travel itinerary for {destination}.
        
        Trip Details:
        - Destination: {destination}
        - Budget: {prefs['budget']}
        - Dates: {start_date} to {end_date}
        - Travelers: {prefs['travelers']}
        - Interests: {interests}
        - Style: {prefs['travel_style']}
        
        Return JSON:
        {{
            "destination": "{destination}",
            "duration_days": {calculate_days(start_date, end_date)},
            "daily_plans": [
                {{
                    "day": 1,
                    "date": "{start_date}",
                    "activities": [
                        {{
                            "time": "09:00",
                            "activity": "Activity name",
                            "description": "Description",
                            "location": "Location",
                            "duration_hours": 2,
                            "cost_estimate": 25.0,
                            "booking_required": false
                        }}
                    ],
                    "meals": [
                        {{
                            "type": "lunch",
                            "recommendation": "Restaurant name",
                            "cuisine": "Local cuisine",
                            "cost_estimate": 20.0
                        }}
                    ],
                    "accommodation": "Hotel recommendation",
                    "transportation_tips": "Getting around tips"
                }}
            ],
            "total_cost_estimate": 1500.0,
            "packing_list": ["item1", "item2"],
            "local_tips": ["tip1", "tip2", "tip3", "tip4"]
        }}
        """
    
    def _get_fallback_itinerary(self, prefs: Dict) -> Dict:
        """Destination-specific fallback itinerary with hotels and car rentals"""
        
        destination = prefs.get('destination', 'Paris, France')
        start_date = prefs.get('start_date', '2025-04-01')
        end_date = prefs.get('end_date', '2025-04-07')
        
        # Get content and dates
        content = get_destination_content(destination)
        dates = generate_dates(start_date, end_date)
        days = len(dates)
        
        # Build daily plans
        daily_plans = []
        for i in range(min(days, 5)):
            day_key = f"day{i+1}"
            day_data = content.get(day_key, content.get("day1", {}))
            
            daily_plans.append({
                "day": i + 1,
                "date": dates[i],
                "activities": [
                    {
                        "time": "09:00",
                        "activity": day_data.get("morning", {}).get("activity", "Morning Exploration"),
                        "description": day_data.get("morning", {}).get("description", "Discover the city"),
                        "location": destination,
                        "duration_hours": 3,
                        "cost_estimate": day_data.get("morning", {}).get("cost", 0),
                        "booking_required": day_data.get("morning", {}).get("booking", False)
                    },
                    {
                        "time": "14:00",
                        "activity": day_data.get("afternoon", {}).get("activity", "Afternoon Adventure"),
                        "description": day_data.get("afternoon", {}).get("description", "Explore local attractions"),
                        "location": destination,
                        "duration_hours": 3,
                        "cost_estimate": day_data.get("afternoon", {}).get("cost", 0),
                        "booking_required": day_data.get("afternoon", {}).get("booking", False)
                    }
                ],
                "meals": [
                    {"type": "lunch", "recommendation": day_data.get("lunch", "Local Restaurant"), "cuisine": "Local", "cost_estimate": 25.0},
                    {"type": "dinner", "recommendation": day_data.get("dinner", "Evening Dining"), "cuisine": "Local", "cost_estimate": 45.0}
                ],
                "accommodation": content.get("accommodation", "Centrally located hotel"),
                "transportation_tips": content.get("transport_tips", "Public transport is efficient")
            })
        
        # Add generic extra days
        for i in range(len(daily_plans), days):
            daily_plans.append({
                "day": i + 1,
                "date": dates[i],
                "activities": [
                    {"time": "10:00", "activity": "Explore at your own pace", "description": "Use this day to revisit favorite spots or discover hidden gems", "location": destination, "duration_hours": 4, "cost_estimate": 0, "booking_required": False},
                    {"time": "16:00", "activity": "Relax and Reflect", "description": "Enjoy local cafes, shop, or rest", "location": destination, "duration_hours": 2, "cost_estimate": 0, "booking_required": False}
                ],
                "meals": [
                    {"type": "lunch", "recommendation": "Try a local cafe", "cuisine": "Local", "cost_estimate": 20},
                    {"type": "dinner", "recommendation": "Explore new neighborhoods", "cuisine": "Local", "cost_estimate": 35}
                ],
                "accommodation": content.get("accommodation", "Centrally located hotel"),
                "transportation_tips": content.get("transport_tips", "Public transport is efficient")
            })
        
        return {
            "destination": destination,
            "duration_days": days,
            "daily_plans": daily_plans,
            "total_cost_estimate": content.get("total_cost", 850),
            "packing_list": content.get("packing_list", ["Passport", "Comfortable shoes", "Camera", "Adapter"]),
            "local_tips": content.get("local_tips", [
                "Learn a few basic local phrases",
                "Book popular attractions online in advance",
                "Check local events during your visit"
            ]),
            "hotels": get_hotel_recommendations(destination, days),
            "car_rentals": get_car_rental_recommendations(destination, days)
        }
    
    def _validate_and_format(self, itinerary: Dict, prefs: Dict) -> Dict:
        """Validate and format AI response"""
        required = ["destination", "daily_plans", "total_cost_estimate"]
        for field in required:
            if field not in itinerary:
                raise ValueError(f"Missing required field: {field}")
        
        if "destination" not in itinerary:
            itinerary["destination"] = prefs.get("destination", "Unknown")
        
        return itinerary