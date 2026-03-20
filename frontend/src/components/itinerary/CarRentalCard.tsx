"use client";

import { Car, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { CarRental } from "@/types";

interface CarRentalCardProps {
  car: CarRental;
}

export function CarRentalCard({ car }: CarRentalCardProps) {
  const hasValidLink = car.booking_link && car.booking_link !== "#";

  return (
    <Card className="p-4 hover:border-primary-500/30 transition-all">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center flex-shrink-0">
          <Car size={20} className="text-primary-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-base">{car.company}</h3>
          <p className="text-secondary-400 text-xs mt-0.5">{car.car_type}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-white">
            {car.currency} {car.price_per_day}
          </p>
          <p className="text-secondary-500 text-[10px]">per day</p>
        </div>
      </div>

      {/* Pickup/Dropoff */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-secondary-400 text-xs">
          <Calendar size={12} className="text-primary-400 flex-shrink-0" />
          <span className="truncate">Pick up: {car.pickup_location}</span>
        </div>
        <div className="flex items-center gap-2 text-secondary-400 text-xs">
          <MapPin size={12} className="text-primary-400 flex-shrink-0" />
          <span className="truncate">Drop off: {car.dropoff_location}</span>
        </div>
      </div>

      {/* Total Price */}
      <div className="flex items-center justify-between pt-2 border-t border-secondary-800">
        <span className="text-secondary-500 text-xs">
          Total for {car.total_price / car.price_per_day} days
        </span>
        <span className="text-white font-semibold">
          {car.currency} {car.total_price}
        </span>
      </div>

      {/* Book Button (if available) */}
      {hasValidLink && (
        <div className="mt-3 pt-2 border-t border-secondary-800">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(car.booking_link, "_blank")}
            className="w-full"
          >
            <ExternalLink size={14} className="mr-1" />
            Rent Car
          </Button>
        </div>
      )}
    </Card>
  );
}
