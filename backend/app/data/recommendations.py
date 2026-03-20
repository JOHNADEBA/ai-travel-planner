"""Hotel and car rental recommendations"""

from typing import List, Dict

def get_hotel_recommendations(destination: str, duration_days: int) -> List[Dict]:
    """Generate hotel recommendations based on destination"""
    dest_lower = destination.lower()
    
    if "london" in dest_lower:
        return _london_hotels(duration_days)
    elif "paris" in dest_lower:
        return _paris_hotels(duration_days)
    elif "tokyo" in dest_lower:
        return _tokyo_hotels(duration_days)
    else:
        return _default_hotels(destination, duration_days)


def get_car_rental_recommendations(destination: str, duration_days: int) -> List[Dict]:
    """Generate car rental recommendations"""
    return [
        {
            "company": "Hertz",
            "car_type": "Economy Car (Toyota Yaris or similar)",
            "price_per_day": 45,
            "total_price": 45 * duration_days,
            "currency": "USD",
            "pickup_location": f"{destination} City Center",
            "dropoff_location": f"{destination} Airport",
            "booking_link": "#"
        },
        {
            "company": "Avis",
            "car_type": "Compact SUV (Nissan Qashqai or similar)",
            "price_per_day": 65,
            "total_price": 65 * duration_days,
            "currency": "USD",
            "pickup_location": f"{destination} Airport",
            "dropoff_location": f"{destination} Airport",
            "booking_link": "#"
        },
        {
            "company": "Enterprise",
            "car_type": "Full Size Sedan (Ford Mondeo or similar)",
            "price_per_day": 55,
            "total_price": 55 * duration_days,
            "currency": "USD",
            "pickup_location": f"{destination} City Center",
            "dropoff_location": f"{destination} City Center",
            "booking_link": "#"
        }
    ]


def _london_hotels(duration_days: int) -> List[Dict]:
    return [
        {"name": "The Hoxton, Shoreditch", "address": "Shoreditch, London", "rating": 4.5, "price_per_night": 180, "total_price": 180 * duration_days, "currency": "USD", "amenities": ["Free WiFi", "Restaurant", "Bar", "24-hour front desk", "Airport shuttle"], "distance_to_center": 2.5, "booking_link": "#"},
        {"name": "citizenM Tower of London", "address": "Tower Hill, London", "rating": 4.4, "price_per_night": 150, "total_price": 150 * duration_days, "currency": "USD", "amenities": ["Free WiFi", "24-hour front desk", "Air conditioning", "Flat-screen TV"], "distance_to_center": 1.0, "booking_link": "#"},
        {"name": "The Ritz London", "address": "Piccadilly, London", "rating": 4.9, "price_per_night": 650, "total_price": 650 * duration_days, "currency": "USD", "amenities": ["Free WiFi", "Restaurant", "Bar", "Spa", "Fitness center", "Concierge"], "distance_to_center": 0.5, "booking_link": "#"}
    ]


def _paris_hotels(duration_days: int) -> List[Dict]:
    return [
        {"name": "Hotel Le Six", "address": "6th Arrondissement, Paris", "rating": 4.6, "price_per_night": 210, "total_price": 210 * duration_days, "currency": "USD", "amenities": ["Free WiFi", "Spa", "Bar", "24-hour front desk", "Room service"], "distance_to_center": 1.5, "booking_link": "#"},
        {"name": "Hotel des Grands Boulevards", "address": "2nd Arrondissement, Paris", "rating": 4.4, "price_per_night": 165, "total_price": 165 * duration_days, "currency": "USD", "amenities": ["Free WiFi", "Restaurant", "Bar", "Air conditioning"], "distance_to_center": 1.0, "booking_link": "#"},
        {"name": "Hotel Plaza Athénée", "address": "8th Arrondissement, Paris", "rating": 4.9, "price_per_night": 850, "total_price": 850 * duration_days, "currency": "USD", "amenities": ["Free WiFi", "Restaurant", "Spa", "Fitness center", "Concierge", "Eiffel Tower views"], "distance_to_center": 0.3, "booking_link": "#"}
    ]


def _tokyo_hotels(duration_days: int) -> List[Dict]:
    return [
        {"name": "Hotel Gracery Shinjuku", "address": "Shinjuku, Tokyo", "rating": 4.3, "price_per_night": 140, "total_price": 140 * duration_days, "currency": "USD", "amenities": ["Free WiFi", "Restaurant", "24-hour front desk", "Godzilla statue"], "distance_to_center": 0.5, "booking_link": "#"},
        {"name": "The Peninsula Tokyo", "address": "Marunouchi, Tokyo", "rating": 4.8, "price_per_night": 550, "total_price": 550 * duration_days, "currency": "USD", "amenities": ["Free WiFi", "Restaurant", "Spa", "Fitness center", "Indoor pool", "Concierge"], "distance_to_center": 0.2, "booking_link": "#"},
        {"name": "Citadines Shinjuku Tokyo", "address": "Shinjuku, Tokyo", "rating": 4.2, "price_per_night": 95, "total_price": 95 * duration_days, "currency": "USD", "amenities": ["Free WiFi", "Kitchenette", "24-hour front desk", "Laundry facilities"], "distance_to_center": 0.8, "booking_link": "#"}
    ]


def _default_hotels(destination: str, duration_days: int) -> List[Dict]:
    return [
        {"name": f"Central {destination} Hotel", "address": f"City Center, {destination}", "rating": 4.2, "price_per_night": 120, "total_price": 120 * duration_days, "currency": "USD", "amenities": ["Free WiFi", "Restaurant", "24-hour front desk", "Air conditioning"], "distance_to_center": 0.5, "booking_link": "#"},
        {"name": f"Boutique Hotel {destination}", "address": f"Arts District, {destination}", "rating": 4.5, "price_per_night": 180, "total_price": 180 * duration_days, "currency": "USD", "amenities": ["Free WiFi", "Restaurant", "Bar", "Room service", "Concierge"], "distance_to_center": 1.0, "booking_link": "#"},
        {"name": f"Economy Inn {destination}", "address": f"Near Station, {destination}", "rating": 3.8, "price_per_night": 70, "total_price": 70 * duration_days, "currency": "USD", "amenities": ["Free WiFi", "24-hour front desk", "Parking"], "distance_to_center": 1.5, "booking_link": "#"}
    ]