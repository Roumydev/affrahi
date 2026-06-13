"use client";
import React, { useEffect, useState } from "react";
import { WishlistCard } from "@/components/ui/WishlistCard";
import axios from "axios";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useLang } from "@/context/LangContext";

type WishlistItem = {
  id: string;
  venue: {
    id: string;
    name: string;
    location: string;
    capacity: number;
    price: number;
    image?: string;
  };
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLang();
  const w = t.wishlistPage;

  useEffect(() => {
    axios
      .get("/api/wishlist")
      .then((res) => {
        setWishlist(res.data.wishlist || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleRemove = async (venueId: string) => {
    try {
      await axios.delete("/api/wishlist", { data: { venueId } });
      setWishlist((prev) => prev.filter((item) => item.venue.id !== venueId));
    } catch {}
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-gray-400">{w.loading}</p>
      </div>
    );

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-zinc-800 text-3xl font-bold">{w.title}</h2>
          <p className="text-neutral-400 text-sm mt-1">{w.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-1.5 bg-[#F9F1F3] text-[#8B1538] rounded-full text-sm font-bold">
            {wishlist.length} {wishlist.length === 1 ? w.hall : w.halls}
          </span>
          <Link
            href="/browse-halls"
            className="px-5 py-2 bg-[#8B1538] text-white rounded-xl text-sm font-bold hover:bg-[#6d102c] transition"
          >
            {w.addMore}
          </Link>
        </div>
      </div>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[32px] border border-gray-100">
          <div className="p-6 bg-[#F9F1F3] rounded-full mb-6">
            <Heart size={36} className="text-[#8B1538]" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {w.noFavorites}
          </h3>
          <p className="text-gray-400 mb-6 text-center max-w-xs">
            {w.noFavoritesDesc}
          </p>
          <Link
            href="/browse-halls"
            className="px-8 py-3 bg-[#8B1538] text-white rounded-xl font-bold hover:bg-[#6d102c] transition"
          >
            {w.browseHalls}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {wishlist.map((item) => (
            <WishlistCard
              key={item.id}
              name={item.venue.name}
              location={item.venue.location}
              capacity={item.venue.capacity.toString()}
              price={item.venue.price.toLocaleString()}
              rating={0}
              reviews={0}
              image={item.venue.image || "/venues/placeholder.png"}
              venueId={item.venue.id}
              onRemove={() => handleRemove(item.venue.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
