import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface GenerateItineraryParams {
  preferences: {
    destination: string;
    budget: string;
    start_date: string;
    end_date: string;
    travelers: number;
    interests: string[];
    travel_style: string;
    special_requirements?: string;
  };
  include_flights: boolean;
  include_weather: boolean;
  include_hotels?: boolean;
  include_car_rentals?: boolean;
}

export const itineraryApi = {
  generate: async (params: GenerateItineraryParams) => {
    const response = await api.post("/api/itinerary/generate", params);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/itinerary/${id}`);
    return response.data;
  },
};

export const searchApi = {
  locations: async (query: string) => {
    const response = await api.get(
      `/api/locations/search?q=${encodeURIComponent(query)}`,
    );
    return response.data.results;
  },

  airlines: async (limit: number = 50) => {
    const response = await api.get(`/api/airlines?limit=${limit}`);
    return response.data.airlines;
  },
};

export default api;
