"use client";

import { Plane, Clock, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { FlightOffer } from "@/types";

interface FlightCardProps {
  flight: FlightOffer;
}

export function FlightCard({ flight }: FlightCardProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const hasValidLink = flight.booking_link && flight.booking_link !== "#";

  return (
    <Card className="p-4 hover:border-primary-500/30 transition-all">
      {/* Airline Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-secondary-800">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center flex-shrink-0">
          <Plane size={20} className="text-primary-400" />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-base">{flight.airline}</p>
          <p className="text-secondary-400 text-xs">
            Flight {flight.flight_number}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-white">
            {flight.currency} {flight.price.toLocaleString()}
          </p>
          <p className="text-secondary-500 text-[10px]">Estimated</p>
        </div>
      </div>

      {/* Flight Times */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 text-center">
          <p className="text-xl font-bold text-white">
            {formatTime(flight.departure_time)}
          </p>
          <p className="text-secondary-400 text-xs font-medium mt-1">
            {flight.departure_airport}
          </p>
          <p className="text-secondary-500 text-[10px] mt-0.5">
            {formatDate(flight.departure_time)}
          </p>
        </div>

        <div className="flex flex-col items-center px-2">
          <div className="relative w-12 sm:w-16">
            <div className="h-px w-full bg-secondary-600"></div>
            <Plane
              size={12}
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-primary-400 rotate-45"
            />
          </div>
          <Clock size={10} className="text-secondary-500 mt-1" />
        </div>

        <div className="flex-1 text-center">
          <p className="text-xl font-bold text-white">
            {formatTime(flight.arrival_time)}
          </p>
          <p className="text-secondary-400 text-xs font-medium mt-1">
            {flight.arrival_airport}
          </p>
          <p className="text-secondary-500 text-[10px] mt-0.5">
            {formatDate(flight.arrival_time)}
          </p>
        </div>
      </div>

      {/* Book Button - Right Aligned */}
      {hasValidLink && (
        <div className="flex justify-end mt-4 pt-3 border-t border-secondary-800">
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.open(flight.booking_link, "_blank")}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg transition-all"
          >
            <ExternalLink size={14} className="mr-2" />
            Book Flight
          </Button>
        </div>
      )}
    </Card>
  );
}
