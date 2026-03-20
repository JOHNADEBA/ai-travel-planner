export type Budget = 'budget' | 'moderate' | 'luxury'
export type TravelStyle = 'solo' | 'couple' | 'family' | 'friends'

export interface TravelPreferences {
  destination: string
  budget: Budget
  start_date: string
  end_date: string
  travelers: number
  interests: string[]
  travel_style: TravelStyle
  special_requirements?: string
}

export interface ItineraryRequest {
  preferences: TravelPreferences
  include_flights: boolean
  include_weather: boolean
  include_hotels?: boolean
  include_car_rentals?: boolean
}

export interface FlightOffer {
  airline: string
  flight_number: string
  departure_airport: string
  arrival_airport: string
  departure_time: string
  arrival_time: string
  price: number
  currency: string
  booking_link: string
}

export interface HotelOffer {
  name: string
  address: string
  rating: number
  price_per_night: number
  total_price: number
  currency: string
  amenities: string[]
  booking_link: string
  image_url?: string
  distance_to_center?: number
}

export interface CarRental {
  company: string
  car_type: string
  price_per_day: number
  total_price: number
  currency: string
  pickup_location: string
  dropoff_location: string
  booking_link: string
  image_url?: string
}

export interface WeatherForecast {
  date: string
  condition: string
  temperature_high: number
  temperature_low: number
  precipitation_chance: number
  humidity: number
  wind_speed: number
  icon: string
}

export interface DailyActivity {
  time: string
  activity: string
  description: string
  location?: string
  duration_hours: number
  cost_estimate: number
  booking_required: boolean
}

export interface DailyItinerary {
  day: number
  date: string
  activities: DailyActivity[]
  meals: Array<{ type: string; recommendation: string; cuisine: string; cost_estimate: number }>
  accommodation: string
  transportation_tips: string
}

export interface ItineraryResponse {
  id: string
  destination: string
  duration_days: number
  total_cost_estimate: number
  currency: string
  daily_plans: DailyItinerary[]
  flights?: FlightOffer[]
  hotels?: HotelOffer[]
  car_rentals?: CarRental[]
  weather?: WeatherForecast[]
  packing_list: string[]
  local_tips: string[]
  created_at: string
}

export interface LocationSuggestion {
  id: string
  name: string
  code: string
  type: string
  city: string
  country: string
  full_name: string
}