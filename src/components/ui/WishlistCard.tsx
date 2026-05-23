import React from "react";
import { Heart, MapPin, Users, Star, MessageSquare } from "lucide-react";

interface WishlistCardProps {
  name: string;
  location: string;
  capacity: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
}

export const WishlistCard = ({
  name,
  location,
  capacity,
  price,
  rating,
  reviews,
  image,
}: WishlistCardProps) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-stone-300 p-6 flex flex-col md:flex-row gap-6 overflow-hidden transition-all duration-300 hover:shadow-sm">
      {/* Image Container */}
      <div className="w-full md:w-64 h-44 bg-gray-100 rounded-[10px] flex-shrink-0 overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-zinc-800 text-xl font-bold font-['Inter']">
              {name}
            </h3>
            <div className="flex items-center gap-2 text-neutral-500 text-sm">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
          </div>
          {/* Heart Button */}
          <button className="p-2.5 bg-[#8B1538] text-white rounded-[12px] hover:bg-[#6d102c] transition-colors">
            <Heart size={20} fill="currentColor" />
          </button>
        </div>

        {/* Info Row */}
        <div className="flex flex-wrap items-center gap-6 py-1">
          <div className="flex items-center gap-2 text-sm text-zinc-700 font-['Inter']">
            <Users size={16} className="text-neutral-400" />
            <span>Up to {capacity} guests</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-['Inter']">
            <Star size={16} className="text-amber-400 fill-amber-400" />
            <span className="text-zinc-800 font-medium">{rating}</span>
            <span className="text-neutral-400">({reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-1 text-sm font-['Inter']">
            <span className="text-[#8B1538] font-bold text-base">
              {price} DZD
            </span>
            <span className="text-neutral-400">/ event</span>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-3 pt-2">
          <button className="flex-1 bg-[#8B1538] text-white py-3 rounded-[10px] text-base font-medium font-['Inter'] hover:opacity-90 transition-opacity">
            Book Now
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 rounded-[10px] text-zinc-800 font-medium font-['Inter'] hover:bg-stone-50 transition-colors">
            <MessageSquare size={18} />
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  );
};
