import httpx
from typing import List, Optional
from datetime import datetime, timedelta
import random
from .models import FlightOffer

class FlightAPI:
    def __init__(self):
        self.base_url = "https://api.skypicker.com"
    
    async def search_flights(self, origin: str, destination: str, 
                           departure_date: str, return_date: Optional[str] = None,
                           adults: int = 1) -> List[FlightOffer]:
        """Generate realistic mock flight data"""
        return self._get_mock_flights(origin, destination, departure_date, return_date, adults)
    
    async def get_airlines(self) -> List[dict]:
        """Get real airline data from Skypicker"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/airlines",
                    timeout=10.0
                )
                if response.status_code == 200:
                    return response.json()
        except Exception as e:
            print(f"Error fetching airlines: {e}")
        return []
    
    async def search_locations(self, term: str, locale: str = "en") -> List[dict]:
        """Search for airports/cities using working locations endpoint"""
        try:
            async with httpx.AsyncClient() as client:
                params = {
                    "term": term,
                    "locale": locale,
                    "location_types": "airport",
                    "limit": 10
                }
                response = await client.get(
                    f"{self.base_url}/locations",
                    params=params,
                    timeout=10.0
                )
                if response.status_code == 200:
                    data = response.json()
                    return data.get("locations", [])
        except Exception as e:
            print(f"Location search error: {e}")
        return []
    
    def _get_mock_flights(self, origin: str, destination: str, 
                     departure_date: str, return_date: Optional[str] = None,
                     adults: int = 1) -> List[FlightOffer]:
        """Generate realistic mock flight data with both outbound and return"""
        
        airlines = ["Delta", "United", "American", "Lufthansa", "Emirates", "Singapore Airlines"]
        offers = []
        
        # Parse departure date
        try:
            dep_time = datetime.fromisoformat(departure_date).replace(hour=8, minute=0)
        except:
            dep_time = datetime.now().replace(hour=8, minute=0)
        
        arr_time = dep_time + timedelta(hours=random.randint(2, 12))
        
        # Outbound flight
        offers.append(FlightOffer(
            airline=random.choice(airlines),
            flight_number=f"{random.randint(100, 999)}",
            departure_airport=origin,
            arrival_airport=destination,
            departure_time=dep_time,
            arrival_time=arr_time,
            price=round(random.uniform(300, 1200), 2),
            currency="USD",
            booking_link="#"
        ))
        
        # Return flight if round trip
        if return_date:
            try:
                ret_time = datetime.fromisoformat(return_date).replace(hour=18, minute=0)
            except:
                ret_time = datetime.now().replace(hour=18, minute=0)
                
            ret_arrival = ret_time + timedelta(hours=random.randint(2, 12))
            
            offers.append(FlightOffer(
                airline=random.choice(airlines),
                flight_number=f"{random.randint(100, 999)}",
                departure_airport=destination,
                arrival_airport=origin,
                departure_time=ret_time,
                arrival_time=ret_arrival,
                price=round(random.uniform(300, 1200), 2),
                currency="USD",
                booking_link="#"
            ))
        
        return offers