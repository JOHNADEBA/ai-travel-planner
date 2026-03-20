"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Share2, Hotel, Car, Check, Copy } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DayCard } from "./DayCard";
import { WeatherWidget } from "./WeatherWidget";
import { FlightCard } from "./FlightCard";
import { HotelCard } from "./HotelCard";
import { CarRentalCard } from "./CarRentalCard";
import type { ItineraryResponse } from "@/types";

interface ItineraryDisplayProps {
  itinerary: ItineraryResponse;
}

export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  const [copied, setCopied] = useState(false);
  const websiteUrl =
    process.env.NEXT_PUBLIC_WEBSITE_URL ||
    "https://ai-travel-planner.vercel.app";

  // Create a shareable URL with the itinerary ID
  const shareableUrl = `${websiteUrl}/itinerary/${itinerary.id}`;

  const handleShare = async () => {
    const shareData = {
      title: `Trip to ${itinerary.destination}`,
      text: `Check out my ${itinerary.duration_days}-day itinerary for ${itinerary.destination}!`,
      url: shareableUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      // Fallback: copy to clipboard
      const shareText = `${shareData.title}\n${shareData.text}\n\nView itinerary: ${shareData.url}`;
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    // Create a clean HTML version of the itinerary for download
    const downloadHtml = generateDownloadHtml(itinerary);

    // Create blob and download
    const blob = new Blob([downloadHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `itinerary_${itinerary.destination}_${new Date().toISOString().split("T")[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateDownloadHtml = (itinerary: ItineraryResponse): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${itinerary.destination} Itinerary</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 40px 20px;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            font-size: 32px;
            margin-bottom: 8px;
            color: #1a1a1a;
          }
          h2 {
            font-size: 24px;
            margin: 24px 0 16px;
            padding-bottom: 8px;
            border-bottom: 2px solid #e0e0e0;
          }
          h3 {
            font-size: 20px;
            margin: 16px 0 12px;
          }
          .header {
            text-align: center;
            margin-bottom: 32px;
            padding-bottom: 24px;
            border-bottom: 3px solid #3b82f6;
          }
          .dates {
            color: #666;
            margin-bottom: 16px;
          }
          .day-card {
            margin: 24px 0;
            padding: 20px;
            background: #f9fafb;
            border-radius: 12px;
            border-left: 4px solid #3b82f6;
          }
          .day-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #1a1a1a;
          }
          .activity {
            margin: 12px 0;
            padding-left: 20px;
          }
          .activity-time {
            font-weight: bold;
            color: #3b82f6;
          }
          .activity-name {
            font-weight: 600;
            margin: 4px 0;
          }
          .meal {
            margin: 8px 0;
            padding: 8px 12px;
            background: #fef3c7;
            border-radius: 8px;
          }
          .flight-card, .hotel-card, .car-card {
            margin: 12px 0;
            padding: 16px;
            background: #f9fafb;
            border-radius: 12px;
          }
          .price {
            font-weight: bold;
            color: #059669;
          }
          .tips {
            background: #e6f7e6;
            padding: 16px;
            border-radius: 12px;
            margin: 16px 0;
          }
          .footer {
            margin-top: 32px;
            padding-top: 16px;
            text-align: center;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #e0e0e0;
          }
          @media print {
            body {
              background: white;
              padding: 0;
            }
            .container {
              box-shadow: none;
              padding: 20px;
            }
            .day-card {
              break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✈️ Trip to ${itinerary.destination}</h1>
            <div class="dates">${itinerary.duration_days} days • Estimated budget: ${itinerary.currency} ${itinerary.total_cost_estimate.toLocaleString()}</div>
          </div>

          ${
            itinerary.flights && itinerary.flights.length > 0
              ? `
            <h2>✈️ Flights</h2>
            ${itinerary.flights
              .map(
                (flight) => `
              <div class="flight-card">
                <strong>${flight.airline}</strong> - Flight ${flight.flight_number}<br>
                ${new Date(flight.departure_time).toLocaleString()} → ${new Date(flight.arrival_time).toLocaleString()}<br>
                <span class="price">${flight.currency} ${flight.price}</span>
              </div>
            `,
              )
              .join("")}
          `
              : ""
          }

          ${
            itinerary.hotels && itinerary.hotels.length > 0
              ? `
            <h2>🏨 Recommended Hotels</h2>
            ${itinerary.hotels
              .map(
                (hotel) => `
              <div class="hotel-card">
                <strong>${hotel.name}</strong> ★ ${hotel.rating}<br>
                ${hotel.address}<br>
                <span class="price">${hotel.currency} ${hotel.price_per_night}/night</span>
              </div>
            `,
              )
              .join("")}
          `
              : ""
          }

          <h2>📅 Daily Itinerary</h2>
          ${itinerary.daily_plans
            .map(
              (day) => `
            <div class="day-card">
              <div class="day-title">Day ${day.day} - ${new Date(day.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
              ${day.activities
                .map(
                  (activity) => `
                <div class="activity">
                  <div class="activity-time">${activity.time}</div>
                  <div class="activity-name">${activity.activity}</div>
                  <div>${activity.description}</div>
                  ${activity.location ? `<div>📍 ${activity.location}</div>` : ""}
                  <div>💰 $${activity.cost_estimate} • ⏱️ ${activity.duration_hours} hours</div>
                </div>
              `,
                )
                .join("")}
              ${day.meals
                .map(
                  (meal) => `
                <div class="meal">
                  <strong>${meal.type}</strong>: ${meal.recommendation} (${meal.cuisine}) - $${meal.cost_estimate}
                </div>
              `,
                )
                .join("")}
              ${day.accommodation ? `<div><strong>🏨 Accommodation:</strong> ${day.accommodation}</div>` : ""}
              ${day.transportation_tips ? `<div><strong>🚆 Transportation:</strong> ${day.transportation_tips}</div>` : ""}
            </div>
          `,
            )
            .join("")}

          <div class="tips">
            <strong>💡 Local Tips</strong>
            <ul style="margin-top: 8px; padding-left: 20px;">
              ${itinerary.local_tips.map((tip) => `<li>${tip}</li>`).join("")}
            </ul>
          </div>

          <div class="tips">
            <strong>🎒 Packing List</strong>
            <ul style="margin-top: 8px; padding-left: 20px;">
              ${itinerary.packing_list.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>

          <div class="footer">
            Generated by AI Travel Planner on ${new Date().toLocaleDateString()}<br>
            Plan your next adventure at <a href="${websiteUrl}">${websiteUrl}</a>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header with Share/Download */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {itinerary.destination}
            </h1>
            <p className="text-secondary-400">
              {itinerary.duration_days} days • Estimated cost:{" "}
              {itinerary.currency}{" "}
              {itinerary.total_cost_estimate.toLocaleString()}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={handleShare}>
              {copied ? (
                <>
                  <Check size={16} className="mr-2 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 size={16} className="mr-2" />
                  Share
                </>
              )}
            </Button>
            <Button variant="primary" size="sm" onClick={handleDownload}>
              <Download size={16} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </Card>

      {/* Rest of your ItineraryDisplay content */}
      {/* Weather Widget */}
      {itinerary.weather && itinerary.weather.length > 0 && (
        <WeatherWidget weather={itinerary.weather} />
      )}

      {/* Flights */}
      {itinerary.flights && itinerary.flights.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            ✈️ Flight Options
          </h2>
          <div className="space-y-3">
            {itinerary.flights.map((flight, idx) => (
              <FlightCard key={idx} flight={flight} />
            ))}
          </div>
        </div>
      )}

      {/* Hotels Section */}
      {itinerary.hotels && itinerary.hotels.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Hotel size={20} className="text-primary-400" />
            Recommended Hotels
          </h2>
          <div className="space-y-3">
            {itinerary.hotels.map((hotel, idx) => (
              <HotelCard key={idx} hotel={hotel} />
            ))}
          </div>
        </div>
      )}

      {/* Car Rentals Section */}
      {itinerary.car_rentals && itinerary.car_rentals.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Car size={20} className="text-primary-400" />
            Car Rentals
          </h2>
          <div className="space-y-3">
            {itinerary.car_rentals.map((car, idx) => (
              <CarRentalCard key={idx} car={car} />
            ))}
          </div>
        </div>
      )}

      {/* Daily Itinerary */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          📅 Daily Itinerary
        </h2>
        <div className="space-y-4">
          {itinerary.daily_plans.map((day) => (
            <DayCard key={day.day} day={day} />
          ))}
        </div>
      </div>

      {/* Packing List & Local Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            🎒 Packing List
          </h3>
          <ul className="space-y-2">
            {itinerary.packing_list.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-secondary-300"
              >
                <span className="text-primary-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            💡 Local Tips
          </h3>
          <ul className="space-y-2">
            {itinerary.local_tips.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-secondary-300"
              >
                <span className="text-primary-400 mt-1">💡</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </motion.div>
  );
}
