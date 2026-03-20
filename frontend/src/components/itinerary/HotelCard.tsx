"use client";

import {
  Hotel,
  Star,
  MapPin,
  Wifi,
  Coffee,
  Car,
  Dumbbell,
  Utensils,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { HotelOffer } from "@/types";

interface HotelCardProps {
  hotel: HotelOffer;
}

const amenityIcons: Record<string, any> = {
  "Free WiFi": Wifi,
  Restaurant: Utensils,
  Bar: Coffee,
  Spa: Sparkles,
  "Fitness center": Dumbbell,
  Parking: Car,
  "Air conditioning": Hotel,
  "24-hour front desk": Hotel,
  "Room service": Coffee,
  Concierge: Star,
};

export function HotelCard({ hotel }: HotelCardProps) {
  const getAmenityIcon = (amenity: string) => {
    for (const [key, Icon] of Object.entries(amenityIcons)) {
      if (amenity.includes(key)) return Icon;
    }
    return Star;
  };

  const hasValidLink = hotel.booking_link && hotel.booking_link !== "#";

  return (
    <Card className="p-4 hover:border-primary-500/30 transition-all">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center flex-shrink-0">
          <Hotel size={24} className="text-primary-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-base">{hotel.name}</h3>
          <div className="flex items-center gap-2 text-secondary-400 text-xs mt-1">
            <MapPin size={10} />
            <span className="truncate">{hotel.address}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded-lg">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          <span className="text-white text-sm font-medium">{hotel.rating}</span>
        </div>
      </div>

      {/* Amenities */}
      <div className="flex flex-wrap gap-2 mb-3">
        {hotel.amenities.slice(0, 4).map((amenity) => {
          const Icon = getAmenityIcon(amenity);
          return (
            <span
              key={amenity}
              className="flex items-center gap-1 text-secondary-400 text-xs bg-secondary-800/50 px-2 py-1 rounded-full"
            >
              <Icon size={10} />
              {amenity.length > 12 ? amenity.slice(0, 10) + "..." : amenity}
            </span>
          );
        })}
        {hotel.amenities.length > 4 && (
          <span className="text-secondary-500 text-xs bg-secondary-800/50 px-2 py-1 rounded-full">
            +{hotel.amenities.length - 4}
          </span>
        )}
      </div>

      {/* Distance & Price */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-secondary-800">
        <div>
          {hotel.distance_to_center !== undefined && (
            <p className="text-secondary-400 text-xs">
              📍 {hotel.distance_to_center}km from center
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-white">
            {hotel.currency} {hotel.price_per_night}
          </p>
          <p className="text-secondary-500 text-[10px]">
            per night • Total: {hotel.currency} {hotel.total_price}
          </p>
        </div>
      </div>

      {/* Book Button - Right Aligned */}
      {hasValidLink && (
        <div className="flex justify-end mt-3 pt-2 border-t border-secondary-800">
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.open(hotel.booking_link, "_blank")}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg transition-all"
          >
            <ExternalLink size={14} className="mr-2" />
            Book Hotel
          </Button>
        </div>
      )}
    </Card>
  );
}
