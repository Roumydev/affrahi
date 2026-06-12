"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Reservation = {
  id: string;
  date: string;
  status: string;
  guests: number;
  eventType?: string;
  client: { name: string; email: string };
  venue: { name: string; location: string };
};

const statusColor = (s: string) =>
  s === "confirmed"
    ? "bg-green-100 text-green-700"
    : s === "rejected"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios
      .get("/api/admin/reservations")
      .then((res) => {
        setReservations(res.data.reservations);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    filter === "all"
      ? reservations
      : reservations.filter((r) => r.status === filter);

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-neutral-500">Loading...</p>
      </div>
    );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#8B1538]">All Reservations</h1>
        <span className="text-neutral-500">{reservations.length} total</span>
      </div>

      <div className="flex gap-2 mb-6">
        {["all", "pending", "confirmed", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition ${
              filter === s
                ? "bg-[#8B1538] text-white"
                : "bg-white border border-stone-200 text-neutral-500 hover:bg-stone-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-stone-200">
          <p className="text-neutral-400">No reservations found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] px-6 py-3 bg-stone-50 border-b border-stone-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
            <span>Client</span>
            <span>Venue</span>
            <span>Date</span>
            <span className="text-center">Guests</span>
            <span>Status</span>
          </div>
          {filtered.map((r, i) => (
            <div
              key={r.id}
              className={`grid grid-cols-[2fr_2fr_1fr_1fr_1fr] px-6 py-4 items-center text-sm ${
                i !== filtered.length - 1 ? "border-b border-stone-100" : ""
              }`}
            >
              <div>
                <p className="font-medium text-zinc-800">{r.client.name}</p>
                <p className="text-xs text-neutral-400">{r.client.email}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800">{r.venue.name}</p>
                <p className="text-xs text-neutral-400">{r.venue.location}</p>
              </div>
              <span className="text-neutral-600">
                {new Date(r.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="text-center text-zinc-700">{r.guests}</span>
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize w-fit ${statusColor(r.status)}`}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
