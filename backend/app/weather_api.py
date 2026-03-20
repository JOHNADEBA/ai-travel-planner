import httpx
import os
from typing import List
from datetime import datetime, timedelta, date
from .models import WeatherForecast

class WeatherAPI:
    def __init__(self):
        self.api_key = os.getenv("OPENWEATHER_API_KEY")
    
    async def get_forecast(self, city: str, days: int = 5) -> List[WeatherForecast]:
        """Get real weather forecast from OpenWeatherMap"""
        
        if not self.api_key:
            print("⚠️ No OpenWeatherMap API key, returning empty forecast")
            return []
        
        forecasts = []
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    "https://api.openweathermap.org/data/2.5/forecast",
                    params={
                        "q": city,
                        "appid": self.api_key,
                        "units": "metric",
                        "cnt": min(days * 8, 40)
                    },
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Group by day
                    daily_data = {}
                    for item in data.get("list", []):
                        dt = datetime.fromtimestamp(item.get("dt", 0))
                        day_key = dt.date()
                        
                        if day_key not in daily_data:
                            daily_data[day_key] = []
                        daily_data[day_key].append(item)
                    
                    # Create daily forecasts
                    for i, (day_key, items) in enumerate(list(daily_data.items())[:days]):
                        temps = [item["main"]["temp"] for item in items]
                        weather_desc = items[0]["weather"][0]["description"]
                        weather_icon = items[0]["weather"][0]["icon"]
                        
                        forecast = WeatherForecast(
                            date=day_key,
                            condition=weather_desc,
                            temperature_high=max(temps),
                            temperature_low=min(temps),
                            precipitation_chance=items[0].get("pop", 0) * 100,
                            humidity=items[0]["main"]["humidity"],
                            wind_speed=items[0]["wind"]["speed"],
                            icon=f"https://openweathermap.org/img/wn/{weather_icon}@2x.png"
                        )
                        forecasts.append(forecast)
                
        except Exception as e:
            print(f"Weather API error: {e}")
        
        return forecasts