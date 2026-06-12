"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HallCard from "@/components/sections/browse/HallCard";
import { useLang } from "@/context/LangContext";

type Venue = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  price: number;
  description?: string;
  image?: string;
  owner: { name: string };
};

export default function BrowseHallsPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minCapacity, setMinCapacity] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState<string | null>(null);
  const { t } = useLang();
  const b = t.browse;

  useEffect(() => {
    axios.get("/api/venues").then((r) => {
      setVenues(r.data.venues);
      setLoading(false);
    });
    axios
      .get("/api/wishlist")
      .then((r) => setWishlist(r.data.wishlist.map((w: any) => w.venueId)))
      .catch(() => {});
  }, []);

  const toggleWishlist = async (e: React.MouseEvent, venueId: string) => {
    e.preventDefault();
    setLoadingWishlist(venueId);
    try {
      if (wishlist.includes(venueId)) {
        await axios.delete("/api/wishlist", { data: { venueId } });
        setWishlist((p) => p.filter((id) => id !== venueId));
      } else {
        await axios.post("/api/wishlist", { venueId });
        setWishlist((p) => [...p, venueId]);
      }
    } catch {
      window.location.href = "/login";
    }
    setLoadingWishlist(null);
  };

  const filtered = venues.filter((v) => {
    const q = search.toLowerCase();
    return (
      (v.name.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q)) &&
      (maxPrice ? v.price <= Number(maxPrice) : true) &&
      (minCapacity ? v.capacity >= Number(minCapacity) : true)
    );
  });

  return (
    <main className="min-h-screen bg-neutral-100">
      <Navbar />
      <div className="bg-burgundy-700 py-12 sm:py-16 px-4 sm:px-6 text-center">
        <span className="font-body text-gold-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
          {b.badge}
        </span>
        <h1 className="font-heading text-[36px] sm:text-[50px] font-bold text-white mb-3 leading-tight">
          {b.title}
        </h1>
        <p className="font-body text-white/75 text-[14px]">{b.desc}</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div
          className="bg-white rounded-2xl border border-neutral-300 p-4 sm:p-5 mb-8 flex flex-col sm:flex-row gap-3"
          style={{ boxShadow: "0 2px 4px rgba(43,43,43,0.06)" }}
        >
          <input
            type="text"
            placeholder={b.searchPh}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] text-neutral-900 placeholder-neutral-400 transition-colors"
          />
          <input
            type="number"
            placeholder={b.maxPricePh}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full sm:w-40 p-3 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] text-neutral-900 placeholder-neutral-400 transition-colors"
          />
          <input
            type="number"
            placeholder={b.minGuestsPh}
            value={minCapacity}
            onChange={(e) => setMinCapacity(e.target.value)}
            className="w-full sm:w-32 p-3 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] text-neutral-900 placeholder-neutral-400 transition-colors"
          />
        </div>
        {loading ? (
          <div className="text-center py-20 font-body text-neutral-400">
            {b.loading}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 font-body text-neutral-400">
            {b.noVenues}
          </div>
        ) : (
          <>
            <p className="font-body text-[13px] text-neutral-500 mb-5">
              {b.venuesFound(filtered.length)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((v) => (
                <HallCard
                  key={v.id}
                  id={v.id}
                  name={v.name}
                  location={v.location}
                  price={v.price}
                  image={v.image}
                  isWishlisted={wishlist.includes(v.id)}
                  loadingWishlist={loadingWishlist === v.id}
                  onToggleWishlist={(e) => toggleWishlist(e, v.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
