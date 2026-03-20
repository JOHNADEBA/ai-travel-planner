"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TravelForm, TravelFormRef } from "@/components/forms/TravelForm";
import { ItineraryDisplay } from "@/components/itinerary/ItineraryDisplay";
import { useItinerary } from "@/hooks/useItinerary";
import type { TravelPreferences } from "@/types";

export default function Home() {
  const { itinerary, loading, error, generate, reset } = useItinerary();
  const [showForm, setShowForm] = useState(true);
  const travelFormContainerRef = useRef<HTMLDivElement>(null);
  const travelFormRef = useRef<TravelFormRef>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (
    preferences: TravelPreferences,
    includeFlights: boolean,
    includeWeather: boolean,
  ) => {
    try {
      await generate(preferences, includeFlights, includeWeather);
      setShowForm(false);

      // Scroll to results after a short delay to allow rendering
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (err) {
      console.error("Generation failed:", err);
    }
  };

  const handleNewTrip = () => {
    reset();
    setShowForm(true);
    // Scroll back to form
    setTimeout(() => {
      travelFormContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleSelectDestination = (city: string) => {
    // Set the destination in the form
    if (travelFormRef.current) {
      travelFormRef.current.setDestination(city);
    }
    // Scroll to form
    setTimeout(() => {
      travelFormContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  // Scroll to loading state when loading starts
  useEffect(() => {
    if (loading) {
      loadingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [loading]);

  const popularDestinations = [
    "Paris",
    "Tokyo",
    "Rome",
    "Bali",
    "New York",
    "London",
    "Dubai",
    "Barcelona",
  ];

  const travelTips = [
    {
      title: "✈️ Book Flights Smart",
      description:
        "Book international flights 2-3 months in advance for the best deals.",
    },
    {
      title: "🏨 Accommodation Tips",
      description:
        "Look for places with free cancellation in case plans change.",
    },
    {
      title: "🎒 Packing Essentials",
      description: "Always pack a universal adapter and a portable power bank!",
    },
    {
      title: "📱 Local SIM Cards",
      description:
        "Get an eSIM or local SIM for affordable data while traveling.",
    },
  ];

  const seasons = [
    {
      emoji: "🌸",
      name: "Spring",
      months: "March - May",
      description: "Perfect for Europe & Japan",
    },
    {
      emoji: "☀️",
      name: "Summer",
      months: "June - August",
      description: "Great for beaches & mountains",
    },
    {
      emoji: "🍂",
      name: "Fall",
      months: "September - November",
      description: "Ideal for wine regions & foliage",
    },
    {
      emoji: "❄️",
      name: "Winter",
      months: "December - February",
      description: "Perfect for skiing & holidays",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary-900 to-secondary-950">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">AI Travel Planner</span>
          </h1>
          <p className="text-secondary-400 text-lg max-w-2xl mx-auto">
            Tell us your preferences and let AI create your perfect personalized
            itinerary
          </p>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Loading State with ref */}
        {loading && (
          <div ref={loadingRef}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto text-center py-12"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary-800/50 rounded-full">
                <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-secondary-300">
                  AI is crafting your perfect itinerary...
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Form or Results */}
        {!loading && showForm && (
          <>
            <div ref={travelFormContainerRef}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto"
              >
                <TravelForm
                  ref={travelFormRef}
                  onSubmit={handleGenerate}
                  isLoading={loading}
                />
              </motion.div>
            </div>

            {/* Two Column Layout: Popular Destinations + Travel Tips */}
            <div className="max-w-6xl mx-auto mt-16">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Popular Destinations Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-secondary-800/30 rounded-2xl p-6 border border-secondary-700 hover:border-primary-500/50 transition-all"
                >
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🌟</span>
                    Popular Destinations
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                    {popularDestinations.map((city) => (
                      <button
                        key={city}
                        onClick={() => handleSelectDestination(city)}
                        className="p-2 bg-secondary-800/50 rounded-lg text-center hover:bg-secondary-700 transition-colors group text-left px-3"
                      >
                        <span className="text-secondary-300 group-hover:text-primary-400 transition-colors text-sm">
                          {city}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Travel Tips Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-secondary-800/30 rounded-2xl p-6 border border-secondary-700 hover:border-primary-500/50 transition-all"
                >
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Travel Tips
                  </h2>
                  <div className="space-y-3">
                    {travelTips.map((tip, index) => (
                      <div
                        key={tip.title}
                        className="p-2 rounded-lg hover:bg-secondary-700/30 transition-colors"
                      >
                        <p className="text-white text-sm font-medium">
                          {tip.title}
                        </p>
                        <p className="text-secondary-400 text-xs mt-1">
                          {tip.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Best Time to Visit Section - Full Width */}
            <section id="seasonal" className="max-w-6xl mx-auto mt-12 py-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-secondary-800/30 rounded-2xl p-6 border border-secondary-700"
              >
                <h2 className="text-xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
                  <span className="text-2xl">📅</span>
                  Best Time to Visit
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {seasons.map((season) => (
                    <div
                      key={season.name}
                      className="p-3 bg-secondary-800/50 rounded-xl text-center hover:bg-secondary-700/50 transition-colors"
                    >
                      <p className="text-2xl mb-1">{season.emoji}</p>
                      <p className="text-white font-medium text-sm">
                        {season.name}
                      </p>
                      <p className="text-secondary-400 text-xs">
                        {season.months}
                      </p>
                      <p className="text-secondary-500 text-xs mt-1">
                        {season.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>
          </>
        )}

        {!loading && !showForm && itinerary && (
          <div ref={resultsRef}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-4xl mx-auto"
            >
              <ItineraryDisplay itinerary={itinerary} />

              <div className="text-center mt-8">
                <button
                  onClick={handleNewTrip}
                  className="text-primary-400 hover:text-primary-300 underline transition-colors"
                >
                  ← Plan Another Trip
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}