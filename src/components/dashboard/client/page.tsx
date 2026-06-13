"use client";
import React, { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle,
  Heart,
  Calendar,
  ArrowRight,
  MapPin,
  Users,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

type Reservation = {
  id: string;
  date: string;
  status: string;
  guests: number;
  eventType?: string;
  venue: { name: string; location: string };
};
type Venue = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  price: number;
  image?: string;
};

export default function ClientDashboardContent() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLang();
  const d = t.clientDash;

  useEffect(() => {
    Promise.all([
      axios.get("/api/reservations"),
      axios.get("/api/wishlist"),
      axios.get("/api/venues"),
    ])
      .then(([rRes, wRes, vRes]) => {
        setReservations(rRes.data.reservations);
        setWishlistCount(wRes.data.wishlist.length);
        setVenues((vRes.data.venues || []).slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const active = reservations.filter((r) => r.status === "pending").length;
  const confirmed = reservations.filter((r) => r.status === "confirmed").length;
  const upcoming = reservations
    .filter((r) => r.status === "confirmed" && new Date(r.date) >= new Date())
    .slice(0, 3);

  if (loading)
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-gray-400">{d.loading}</p>
      </div>
    );

  return (
    <>
      <header className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
          {d.welcomeBack}
        </h2>
        <p className="text-gray-400 text-lg mt-2 font-medium">
          {d.overviewDesc}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <StatCard
          label={d.pending}
          value={active}
          icon={<Clock size={28} className="text-[#8B1538]" />}
          bg="bg-[#F9F1F3]"
        />
        <StatCard
          label={d.confirmed}
          value={confirmed}
          icon={<CheckCircle size={28} className="text-[#2D9B63]" />}
          bg="bg-[#F1F9F4]"
        />
        <StatCard
          label={d.favorites}
          value={wishlistCount}
          icon={<Heart size={28} className="text-[#E05B5B]" />}
          bg="bg-[#FDF2F2]"
        />
        <StatCard
          label={d.total}
          value={reservations.length}
          icon={<Calendar size={28} className="text-[#4A69E2]" />}
          bg="bg-[#F2F5FD]"
        />
      </div>

      <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm mb-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-800">
            {d.upcomingReservations}
          </h3>
          {upcoming.length > 0 && (
            <Link
              href="/client/reservations"
              className="flex items-center gap-2 text-[#8B1538] font-semibold text-sm hover:gap-3 transition-all"
            >
              {d.seeMore} <ArrowRight size={16} />
            </Link>
          )}
        </div>
        {upcoming.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 mb-4">{d.noUpcoming}</p>
            <Link
              href="/browse-halls"
              className="px-6 py-2.5 bg-[#8B1538] text-white rounded-lg text-sm font-bold hover:bg-[#6d102c] transition"
            >
              {d.browseHalls}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {upcoming.map((r) => (
              <ReservationRow
                key={r.id}
                name={r.venue.name}
                location={r.venue.location}
                date={new Date(r.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                type={r.eventType || "Event"}
                guests={`${r.guests} ${d.guests}`}
                status={d.confirmed_status}
                statusBg="bg-green-50 text-green-700"
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F9F1F3] rounded-2xl">
              <Sparkles size={22} className="text-[#8B1538]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {d.discoverHalls}
            </h3>
          </div>
          <Link
            href="/browse-halls"
            className="flex items-center gap-2 text-[#8B1538] font-semibold text-sm hover:gap-3 transition-all"
          >
            {d.browseAllHalls} <ArrowRight size={16} />
          </Link>
        </div>
        <p className="text-gray-400 text-sm mb-8 ml-14">{d.exploreDesc}</p>
        {venues.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 mb-4">{d.noHalls}</p>
            <Link
              href="/browse-halls"
              className="px-6 py-2.5 bg-[#8B1538] text-white rounded-lg text-sm font-bold hover:bg-[#6d102c] transition"
            >
              {d.browseHalls}
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {venues.map((venue) => (
                <VenuePreviewCard
                  key={venue.id}
                  venue={venue}
                  bookNow={d.bookNow}
                  guests={d.guests}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Link
                href="/browse-halls"
                className="flex items-center gap-2 px-8 py-3.5 bg-[#8B1538] text-white rounded-xl font-bold hover:bg-[#6d102c] transition shadow-md shadow-red-900/20"
              >
                {d.seeMoreBook} <ArrowRight size={18} />
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function VenuePreviewCard({
  venue,
  bookNow,
  guests,
}: {
  venue: any;
  bookNow: string;
  guests: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all group">
      <div className="h-40 bg-gradient-to-br from-[#F9F1F3] to-[#f0e0e5] relative overflow-hidden">
        {venue.image ? (
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar size={36} className="text-[#8B1538] opacity-30" />
          </div>
        )}
      </div>
      <div className="p-4 bg-white">
        <h4 className="font-bold text-gray-800 truncate">{venue.name}</h4>
        <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
          <MapPin size={12} />
          <span className="truncate">{venue.location}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Users size={12} />
            <span>
              {venue.capacity} {guests}
            </span>
          </div>
          <span className="text-[#8B1538] font-bold text-sm">
            {venue.price.toLocaleString()} DZD
          </span>
        </div>
        <Link
          href={`/browse-halls/${venue.id}`}
          className="mt-3 w-full flex items-center justify-center py-2 rounded-xl bg-[#F9F1F3] text-[#8B1538] text-sm font-semibold hover:bg-[#8B1538] hover:text-white transition-all"
        >
          {bookNow}
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  bg,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
}) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-50 flex flex-col items-center shadow-sm">
      <div className={`p-5 ${bg} rounded-3xl mb-4`}>{icon}</div>
      <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
        {label}
      </p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}

function ReservationRow({
  name,
  location,
  date,
  type,
  guests,
  status,
  statusBg,
}: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-[#F9F8F6] rounded-3xl">
      <div className="flex items-center space-x-6">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#8B1538] shadow-sm">
          <Calendar size={24} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-800">{name}</h4>
          <p className="text-gray-500 text-sm">
            {date} • {type} • {guests}
            {location && (
              <span className="ml-2 text-gray-400">· {location}</span>
            )}
          </p>
        </div>
      </div>
      <span
        className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase ${statusBg}`}
      >
        {status}
      </span>
    </div>
  );
}
