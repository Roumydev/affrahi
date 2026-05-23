import React from "react";
import { WishlistCard } from "@/components/ui/WishlistCard";

export default function WishlistPage() {
  const favoriteHalls = [
    {
      id: 1,
      name: "Qasr El Djazair",
      location: "Hydra, Alger",
      capacity: "500",
      price: "750,000",
      rating: 4.9,
      reviews: 234,
      image: "/venues/qasr-el-djazair.png",
    },

    {
      id: 2,
      name: "Dar El Bahia",
      location: "Constantine",
      capacity: "200",
      price: "320,000",
      rating: 4.7,
      reviews: 145,
      image: "/venues/dar-el-bahia.png",
    },
    {
      id: 3,
      name: "Qasr El Maram",
      location: "Bab Ezzouar, Alger",
      capacity: "400",
      price: "580,000",
      rating: 4.9,
      reviews: 201,
      image: "/venues/qasr-el-maram.png",
    },
    {
      id: 4,
      name: "Riadh El Yasmine",
      location: "Tipaza",
      capacity: "350",
      price: "400,000",
      rating: 4.6,
      reviews: 112,
      image: "/venues/riadh-el-yasmine.png",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-zinc-800 text-2xl font-medium font-['Inter']">
          Favorite Halls
        </h2>
        <span className="text-neutral-500 text-base font-normal font-['Inter']">
          {favoriteHalls.length} halls
        </span>
      </div>

      {/* Rendering the Components */}
      <div className="flex flex-col gap-6">
        {favoriteHalls.map((hall) => (
          <WishlistCard
            key={hall.id}
            {...hall} // هذه تمرر كل الخصائص (name, location, etc.) مباشرة
          />
        ))}
      </div>
    </div>
  );
}
