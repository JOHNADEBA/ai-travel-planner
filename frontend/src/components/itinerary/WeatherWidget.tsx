"use client";

import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, Wind, Droplets } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { WeatherForecast } from "@/types";

interface WeatherWidgetProps {
  weather: WeatherForecast[];
}

const getWeatherIcon = (condition: string) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes("sun") || lowerCondition.includes("clear"))
    return Sun;
  if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle"))
    return CloudRain;
  if (lowerCondition.includes("cloud")) return Cloud;
  return Cloud;
};

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  if (!weather || weather.length === 0) return null;

  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Cloud size={20} className="text-primary-400" />
        Weather Forecast
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {weather.map((day, idx) => {
          const Icon = getWeatherIcon(day.condition);
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
          });

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-secondary-800/30 rounded-xl p-3 text-center"
            >
              <p className="text-sm text-secondary-400 mb-2">{dayName}</p>
              <Icon size={28} className="mx-auto text-primary-400 mb-2" />
              <p className="text-white font-semibold">
                {Math.round(day.temperature_high)}° /{" "}
                {Math.round(day.temperature_low)}°
              </p>
              <p className="text-xs text-secondary-400 capitalize mt-1">
                {day.condition.split(" ").slice(0, 2).join(" ")}
              </p>
              <div className="flex justify-center gap-2 mt-2 text-xs text-secondary-500">
                <span className="flex items-center gap-1">
                  <Droplets size={10} /> {Math.round(day.humidity)}%
                </span>
                <span className="flex items-center gap-1">
                  <Wind size={10} /> {Math.round(day.wind_speed)} km/h
                </span>
              </div>
              <div className="text-xs text-yellow-500 mt-1">
                ☔ {Math.round(day.precipitation_chance)}%
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
