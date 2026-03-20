"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import type { DailyItinerary } from "@/types";

interface DayCardProps {
  day: DailyItinerary;
}

export function DayCard({ day }: DayCardProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-secondary-800/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">{day.day}</span>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white">Day {day.day}</h3>
            <p className="text-sm text-secondary-400">
              {new Date(day.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp size={20} className="text-secondary-400" />
        ) : (
          <ChevronDown size={20} className="text-secondary-400" />
        )}
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-secondary-800"
        >
          <div className="p-5 space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-primary-400 mb-3">
                📋 Activities
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {day.activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row gap-2 sm:gap-3"
                  >
                    <div className="w-16 flex-shrink-0">
                      <span className="text-sm font-mono text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded inline-block">
                        {activity.time}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm sm:text-base">
                        {activity.activity}
                      </p>
                      <p className="text-secondary-400 text-xs sm:text-sm mt-1">
                        {activity.description}
                      </p>
                      <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 text-xs text-secondary-500">
                        {activity.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={10} /> {activity.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {activity.duration_hours} hours
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={10} /> ${activity.cost_estimate}
                        </span>
                        {activity.booking_required && (
                          <span className="text-yellow-500">
                            ⚠️ Book in advance
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {day.meals && day.meals.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-primary-400 mb-3">
                  🍽️ Meals
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {day.meals.map((meal, idx) => (
                    <div
                      key={idx}
                      className="bg-secondary-800/30 rounded-lg p-3"
                    >
                      <p className="text-white font-medium capitalize">
                        {meal.type}
                      </p>
                      <p className="text-secondary-300 text-sm">
                        {meal.recommendation}
                      </p>
                      <p className="text-secondary-400 text-xs">
                        {meal.cuisine} • ${meal.cost_estimate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {day.accommodation && (
              <div>
                <h4 className="text-sm font-semibold text-primary-400 mb-2">
                  🏨 Accommodation
                </h4>
                <p className="text-secondary-300 text-sm">
                  {day.accommodation}
                </p>
              </div>
            )}

            {day.transportation_tips && (
              <div className="bg-secondary-800/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-primary-400 mb-2">
                  🚆 Transportation Tips
                </h4>
                <p className="text-secondary-300 text-sm">
                  {day.transportation_tips}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </Card>
  );
}
