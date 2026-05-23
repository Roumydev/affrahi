import React from "react";

interface VenueCardProps {
  image: string;
  name: string;
  location: string;
  rating: number;
  price: string;
}

const VenueCard = ({
  image,
  name,
  location,
  rating,
  price,
}: VenueCardProps) => {
  return (
    <div
      className="overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        borderRadius: "12px",
        border: "0.667px solid #E8E6E3",
        background: "rgba(255, 255, 255, 1)", // جعلتها بيضاء لتظهر فوق الخلفية الرمادية
        boxShadow: "0 4px 8px -2px rgba(43, 43, 43, 0.08)",
      }}
    >
      {/* صورة القاعة */}
      <div className="relative h-64 w-full">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* تفاصيل القاعة */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-cormorant text-xl font-bold text-[#1A1A1A]">
            {name}
          </h3>
          <div className="flex items-center bg-[#F8F7F5] px-2 py-1 rounded">
            <img src="/star-fill.svg" alt="rating" className="w-3 h-3 mr-1" />
            <span className="text-xs font-bold">{rating}</span>
          </div>
        </div>

        <div className="flex items-center text-[#4A4A4A] mb-4">
          <img
            src="/location-pin.svg"
            alt="location"
            className="w-4 h-4 mr-1"
          />
          <span className="text-sm font-montserrat">{location}</span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-[#E8E6E3]">
          <div>
            <span className="text-[#8B1538] font-bold text-lg">{price}</span>
            <span className="text-[#4A4A4A] text-xs ml-1">/ Event</span>
          </div>
          <button className="text-[#1A1A1A] text-sm font-bold underline hover:text-[#8B1538]">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
