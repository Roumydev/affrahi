"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import VenueCard from "@/components/ui/VenueCard";
import Navbar from "@/components/layout/Navbar";

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

  useEffect(() => {
    axios.get("/api/venues").then((res) => {
      setVenues(res.data.venues);
      setLoading(false);
    });
  }, []);

  const filtered = venues.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase());
    const matchPrice = maxPrice ? v.price <= Number(maxPrice) : true;
    const matchCapacity = minCapacity
      ? v.capacity >= Number(minCapacity)
      : true;
    return matchSearch && matchPrice && matchCapacity;
  });

  return (
    <main className="min-h-screen bg-[#F8F7F5]">
      <Navbar />
      {/* Hero */}
      <div className="bg-[#8B1538] py-16 px-8 text-center">
        <h1 className="text-4xl font-bold text-white font-cormorant mb-3">
          Browse Halls
        </h1>
        <p className="text-white/80 text-sm font-montserrat">
          Discover Algeria's finest event venues
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-200 focus:border-[#8B1538] outline-none text-sm font-montserrat"
          />
          <input
            type="number"
            placeholder="Max price (DA)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full md:w-48 p-3 rounded-lg border border-gray-200 focus:border-[#8B1538] outline-none text-sm font-montserrat"
          />
          <input
            type="number"
            placeholder="Min guests"
            value={minCapacity}
            onChange={(e) => setMinCapacity(e.target.value)}
            className="w-full md:w-48 p-3 rounded-lg border border-gray-200 focus:border-[#8B1538] outline-none text-sm font-montserrat"
          />
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading venues...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No venues found</div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6 font-montserrat">
              {filtered.length} venue{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((venue) => (
                <Link href={`/browse-halls/${venue.id}`} key={venue.id}>
                  <VenueCard
                    image={venue.image || "/placeholder-hall.jpg"}
                    name={venue.name}
                    location={venue.location}
                    rating={4.5}
                    price={`${venue.price.toLocaleString()} DA`}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
