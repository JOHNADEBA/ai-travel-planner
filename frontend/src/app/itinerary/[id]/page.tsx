"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ItineraryDisplay } from "@/components/itinerary/ItineraryDisplay";
import { itineraryApi } from "@/lib/api";
import type { ItineraryResponse } from "@/types";
import { Card } from "@/components/ui/Card";

export default function ItineraryPage() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      if (!id) return;

      try {
        const data = await itineraryApi.getById(id as string);
        setItinerary(data);
      } catch (err) {
        setError("Itinerary not found or has expired");
        console.error("Failed to fetch itinerary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-secondary-900 to-secondary-950 pt-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary-800/50 rounded-full">
              <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-secondary-300">Loading itinerary...</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !itinerary) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-secondary-900 to-secondary-950 pt-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Itinerary Not Found
            </h1>
            <p className="text-secondary-400 mb-6">
              {error ||
                "The itinerary you're looking for doesn't exist or has been removed."}
            </p>
            <a href="/" className="text-primary-400 hover:underline">
              ← Plan a New Trip
            </a>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary-900 to-secondary-950 py-3">
      <div className="container mx-auto px-4 max-w-4xl">
        <ItineraryDisplay itinerary={itinerary} />
      </div>
    </main>
  );
}
