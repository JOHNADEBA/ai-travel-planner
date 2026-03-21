"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Users, Sparkles, Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { searchApi } from "@/lib/api";
import type { LocationSuggestion, Budget, TravelStyle } from "@/types";

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const travelSchema = z
  .object({
    origin: z.string().min(2, "Origin city is required"),
    destination: z.string().min(2, "Destination is required"),
    budget: z.enum(["budget", "moderate", "luxury"]),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    travelers: z.number().min(1).max(10),
    interests: z.string().optional(),
    travel_style: z.enum(["solo", "couple", "family", "friends"]),
    special_requirements: z.string().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.start_date);
      const end = new Date(data.end_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return start >= today;
    },
    {
      message: "Start date cannot be in the past",
      path: ["start_date"],
    },
  )
  .refine(
    (data) => {
      const start = new Date(data.start_date);
      const end = new Date(data.end_date);
      return start <= end;
    },
    {
      message: "Start date must be before or equal to end date",
      path: ["end_date"],
    },
  );

type FormData = z.infer<typeof travelSchema>;

interface TravelFormProps {
  onSubmit: (
    preferences: any,
    includeFlights: boolean,
    includeWeather: boolean,
  ) => void;
  isLoading: boolean;
}

export interface TravelFormRef {
  setDestination: (city: string) => void;
  setOrigin: (city: string) => void;
}

const budgetOptions: { value: Budget; label: string; emoji: string }[] = [
  { value: "budget", label: "Budget", emoji: "💰" },
  { value: "moderate", label: "Moderate", emoji: "💵" },
  { value: "luxury", label: "Luxury", emoji: "✨" },
];

const styleOptions: { value: TravelStyle; label: string; emoji: string }[] = [
  { value: "solo", label: "Solo Adventure", emoji: "🧳" },
  { value: "couple", label: "Romantic Getaway", emoji: "💑" },
  { value: "family", label: "Family Vacation", emoji: "👨‍👩‍👧‍👦" },
  { value: "friends", label: "Friends Trip", emoji: "👯" },
];

const interestOptions = [
  { value: "art", label: "🎨 Art & Culture" },
  { value: "food", label: "🍜 Food & Dining" },
  { value: "history", label: "🏛️ History" },
  { value: "nature", label: "🌿 Nature" },
  { value: "shopping", label: "🛍️ Shopping" },
  { value: "nightlife", label: "🌙 Nightlife" },
  { value: "adventure", label: "🧗 Adventure" },
  { value: "relaxation", label: "🧘 Relaxation" },
];

const TravelForm = forwardRef<TravelFormRef, TravelFormProps>(
  ({ onSubmit, isLoading }, ref) => {
    const [includeFlights, setIncludeFlights] = useState(true);
    const [includeWeather, setIncludeWeather] = useState(true);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [originSuggestions, setOriginSuggestions] = useState<
      LocationSuggestion[]
    >([]);
    const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);

    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(travelSchema),
      defaultValues: {
        origin: "",
        budget: "moderate",
        travelers: 2,
        travel_style: "couple",
      },
    });

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      setDestination: (city: string) => {
        setValue("destination", city, { shouldValidate: true });
      },
      setOrigin: (city: string) => {
        setValue("origin", city, { shouldValidate: true });
      },
    }));

    const handleDestinationChange = async (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const value = e.target.value;
      setValue("destination", value);

      if (value.length > 2) {
        try {
          const results = await searchApi.locations(value);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const handleOriginChange = async (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const value = e.target.value;
      setValue("origin", value);

      if (value.length > 2) {
        try {
          const results = await searchApi.locations(value);
          setOriginSuggestions(results);
          setShowOriginSuggestions(true);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
        }
      } else {
        setOriginSuggestions([]);
        setShowOriginSuggestions(false);
      }
    };

    const selectSuggestion = (
      suggestion: LocationSuggestion,
      field: "origin" | "destination",
    ) => {
      const cityName = suggestion.city || suggestion.name;
      setValue(field, cityName, { shouldValidate: true });
      if (field === "origin") {
        setShowOriginSuggestions(false);
      } else {
        setShowSuggestions(false);
      }
    };

    const toggleInterest = (interest: string) => {
      setSelectedInterests((prev) =>
        prev.includes(interest)
          ? prev.filter((i) => i !== interest)
          : [...prev, interest],
      );
    };

    const onFormSubmit = (data: FormData) => {
      const preferences = {
        ...data,
        interests: selectedInterests,
        start_date: data.start_date,
        end_date: data.end_date,
      };
      onSubmit(preferences, includeFlights, includeWeather);
    };

    const todayDate = getTodayDate();

    return (
      <Card className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Plan Your Dream Trip
          </h2>
          <p className="text-secondary-400">
            Tell us about your preferences and let AI create your perfect
            itinerary
          </p>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Origin City */}
          <div className="relative">
            <Input
              label="Where are you flying from?"
              placeholder="e.g., New York, London, Tokyo..."
              {...register("origin")}
              onChange={handleOriginChange}
              error={errors.origin?.message}
              icon={<Plane size={18} className="text-primary-400" />}
            />
            {showOriginSuggestions && originSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-secondary-800 border border-secondary-700 rounded-lg shadow-xl max-h-60 overflow-auto">
                {originSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => selectSuggestion(suggestion, "origin")}
                    className="w-full px-4 py-2 text-left hover:bg-secondary-700 transition-colors"
                  >
                    <p className="text-white text-sm">{suggestion.full_name}</p>
                    <p className="text-secondary-400 text-xs">
                      {suggestion.code} • {suggestion.type} •{" "}
                      {suggestion.country}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Destination */}
          <div className="relative">
            <Input
              label="Where do you want to go?"
              placeholder="e.g., Paris, Tokyo, New York..."
              {...register("destination")}
              onChange={handleDestinationChange}
              error={errors.destination?.message}
              icon={<MapPin size={18} className="text-primary-400" />}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-secondary-800 border border-secondary-700 rounded-lg shadow-xl max-h-60 overflow-auto">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => selectSuggestion(suggestion, "destination")}
                    className="w-full px-4 py-2 text-left hover:bg-secondary-700 transition-colors"
                  >
                    <p className="text-white text-sm">{suggestion.full_name}</p>
                    <p className="text-secondary-400 text-xs">
                      {suggestion.code} • {suggestion.type} •{" "}
                      {suggestion.country}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Range - Fixed mobile alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              min={todayDate}
              {...register("start_date")}
              error={errors.start_date?.message}
              className=""
            />

            <Input
              label="End Date"
              type="date"
              min={todayDate}
              {...register("end_date")}
              error={errors.end_date?.message}
              className=""
            />
          </div>

          {/* Budget & Travelers - Stack on mobile, side by side on desktop */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Budget */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Budget
              </label>
              <div className="flex gap-2">
                {budgetOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setValue("budget", option.value)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      watch("budget") === option.value
                        ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                        : "bg-secondary-800 text-secondary-400 hover:bg-secondary-700"
                    }`}
                  >
                    <span className="mr-1">{option.emoji}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Travelers */}
            <div className="flex-1">
              <Input
                label="Number of Travelers"
                type="number"
                min={1}
                max={10}
                {...register("travelers", { valueAsNumber: true })}
                error={errors.travelers?.message}
                icon={<Users size={16} />}
              />
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Travel Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {styleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setValue("travel_style", option.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    watch("travel_style") === option.value
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                      : "bg-secondary-800 text-secondary-400 hover:bg-secondary-700"
                  }`}
                >
                  <span className="mr-1">{option.emoji}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Interests (select multiple)
            </label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <button
                  key={interest.value}
                  type="button"
                  onClick={() => toggleInterest(interest.value)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedInterests.includes(interest.value)
                      ? "bg-primary-500 text-white"
                      : "bg-secondary-800 text-secondary-400 hover:bg-secondary-700"
                  }`}
                >
                  {interest.label}
                </button>
              ))}
            </div>
          </div>

          {/* Special Requirements */}
          <Input
            label="Special Requirements (optional)"
            placeholder="e.g., Vegetarian, Wheelchair accessible..."
            {...register("special_requirements")}
          />

          {/* Options */}
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeFlights}
                onChange={(e) => setIncludeFlights(e.target.checked)}
                className="w-4 h-4 rounded border-secondary-700 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-secondary-300">
                ✈️ Include flight recommendations
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeWeather}
                onChange={(e) => setIncludeWeather(e.target.checked)}
                className="w-4 h-4 rounded border-secondary-700 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-secondary-300">
                🌤️ Include weather forecast
              </span>
            </label>
          </div>

          {/* Date validation feedback */}
          {watch("start_date") && watch("end_date") && (
            <div
              className={`text-xs ${
                new Date(watch("start_date")) >= new Date(todayDate) &&
                new Date(watch("start_date")) <= new Date(watch("end_date"))
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {new Date(watch("start_date")) < new Date(todayDate)
                ? "⚠️ Start date cannot be in the past"
                : new Date(watch("start_date")) <= new Date(watch("end_date"))
                  ? `📅 Trip duration: ${Math.ceil((new Date(watch("end_date")).getTime() - new Date(watch("start_date")).getTime()) / (1000 * 60 * 60 * 24))} days`
                  : "⚠️ End date must be after start date"}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            <Sparkles size={18} className="mr-2" />
            Generate My Itinerary
          </Button>
        </form>
      </Card>
    );
  },
);

TravelForm.displayName = "TravelForm";

export { TravelForm };
