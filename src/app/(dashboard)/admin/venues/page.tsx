"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, MapPin, Users } from "lucide-react";

type Venue = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  price: number;
  owner: { name: string; email: string };
  _count: { reservations: number };
};

export default function AdminVenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("/api/admin/venues")
      .then((res) => {
        setVenues(res.data.venues);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(`Delete "${name}"? This will also delete all its reservations.`)
    )
      return;
    await axios.delete(`/api/admin/venues/${id}`);
    setVenues((prev) => prev.filter((v) => v.id !== id));
  };

  const filtered = venues.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase()) ||
      v.owner.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-neutral-500">Loading...</p>
      </div>
    );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#8B1538]">All Venues</h1>
        <span className="text-neutral-500">
          {venues.length} venue{venues.length !== 1 ? "s" : ""}
        </span>
      </div>

      <input
        type="text"
        placeholder="Search by name, location or owner..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-[#8B1538]/30"
      />

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-stone-200">
          <p className="text-neutral-400">No venues found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 flex justify-between items-start"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-zinc-800">{v.name}</h3>
                <div className="flex items-center gap-2 text-neutral-500 text-sm">
                  <MapPin size={14} />
                  <span>{v.location}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-neutral-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {v.capacity.toLocaleString()} guests
                  </span>
                  <span className="font-medium text-[#8B1538]">
                    {v.price.toLocaleString()} DA
                  </span>
                  <span>
                    {v._count.reservations} reservation
                    {v._count.reservations !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Owner:{" "}
                  <span className="text-zinc-600 font-medium">
                    {v.owner.name}
                  </span>{" "}
                  — {v.owner.email}
                </div>
              </div>
              <button
                onClick={() => handleDelete(v.id, v.name)}
                className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition"
                title="Delete venue"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
