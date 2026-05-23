"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Stats = {
  totalUsers: number;
  totalVenues: number;
  totalReservations: number;
  pendingReservations: number;
};

type RecentReservation = {
  id: string;
  date: string;
  status: string;
  client: { name: string };
  venue: { name: string };
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentReservation[]>([]);

  useEffect(() => {
    axios.get("/api/admin").then((res) => {
      setStats(res.data.stats);
      setRecent(res.data.recentReservations);
    });
  }, []);

  if (!stats) return <div className="p-8 text-center">Loading...</div>;

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Total Venues",
      value: stats.totalVenues,
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Total Reservations",
      value: stats.totalReservations,
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Pending",
      value: stats.pendingReservations,
      color: "bg-yellow-50 text-yellow-700",
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#8B1538] mb-8">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className={`rounded-xl p-6 ${c.color}`}>
            <p className="text-sm font-medium opacity-70">{c.label}</p>
            <p className="text-4xl font-bold mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Reservations</h2>
        <div className="flex flex-col gap-3">
          {recent.map((r) => (
            <div
              key={r.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="font-medium">
                  {r.client.name} → {r.venue.name}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(r.date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  r.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : r.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {r.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
