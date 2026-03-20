import { useState } from 'react'
import { itineraryApi } from '@/lib/api'
import type { ItineraryResponse, TravelPreferences } from '@/types'

export function useItinerary() {
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = async (
    preferences: TravelPreferences,
    includeFlights: boolean = true,
    includeWeather: boolean = true,
    includeHotels: boolean = true,
    includeCarRentals: boolean = true
  ) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await itineraryApi.generate({
        preferences: {
          ...preferences,
          start_date: preferences.start_date,
          end_date: preferences.end_date,
        },
        include_flights: includeFlights,
        include_weather: includeWeather,
        include_hotels: includeHotels,
        include_car_rentals: includeCarRentals,
      })
      setItinerary(result)
      return result
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to generate itinerary')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setItinerary(null)
    setError(null)
  }

  return {
    itinerary,
    loading,
    error,
    generate,
    reset,
  }
}