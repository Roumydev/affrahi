"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

type Venue = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  price: number;
  description?: string;
  image?: string;
  phone?: string;
  owner: { name: string };
};
type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { name: string };
};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function VenueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [pendingDates, setPendingDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [eventType, setEventType] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  useEffect(() => {
    axios
      .get(`/api/venues/${id}`)
      .then((r) => {
        setVenue(r.data.venue);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    axios
      .get(`/api/venues/${id}/reviews`)
      .then((r) => setReviews(r.data.reviews || []))
      .catch(() => {});
    axios
      .get(`/api/venues/${id}/availability`)
      .then((r) => {
        setBookedDates(r.data.bookedDates || []);
        setPendingDates(r.data.pendingDates || []);
      })
      .catch(() => {});
  }, [id]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await axios.post("/api/reservations", {
        venueId: id,
        date,
        guests: Number(guests),
        eventType,
        clientPhone,
      });
      setSuccess(true);
      setBookedDates((p) => [...p, date]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
    setSubmitting(false);
  };

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const fmt = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const isPast = (y: number, m: number, d: number) => {
    const a = new Date(y, m, d);
    a.setHours(0, 0, 0, 0);
    const b = new Date();
    b.setHours(0, 0, 0, 0);
    return a < b;
  };
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  if (loading)
    return (
      <main className="min-h-screen bg-neutral-100">
        <Navbar />
        <div className="flex items-center justify-center py-32 font-body text-neutral-400">
          Loading...
        </div>
      </main>
    );
  if (!venue)
    return (
      <main className="min-h-screen bg-neutral-100">
        <Navbar />
        <div className="flex items-center justify-center py-32 font-body text-neutral-400">
          Venue not found
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-neutral-100">
      <Navbar />

      <div className="w-full h-56 sm:h-72 md:h-80 bg-neutral-300 overflow-hidden">
        {venue.image ? (
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300 text-6xl">
            🏛️
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* LEFT */}
          <div className="flex-1 min-w-0">
            <button
              onClick={() => router.back()}
              className="font-body text-[13px] text-burgundy-700 hover:underline mb-5 inline-flex items-center gap-1"
            >
              ← Back
            </button>
            <h1 className="font-heading text-neutral-900 text-[32px] sm:text-[42px] font-bold mb-3">
              {venue.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <div className="flex items-center gap-1.5 text-neutral-600">
                <img src="/location-pin.svg" alt="" className="w-4 h-4" />
                <span className="font-body text-[14px]">{venue.location}</span>
              </div>
              {venue.phone && (
                <div className="flex items-center gap-1.5 text-neutral-600">
                  <img src="/phone.svg" alt="" className="w-4 h-4" />
                  <span className="font-body text-[14px]">{venue.phone}</span>
                </div>
              )}
              {avgRating && (
                <div className="flex items-center gap-1.5 bg-gold-100 border border-gold-200 px-3 py-1.5 rounded-full">
                  <Star size={13} className="fill-gold-500 text-gold-500" />
                  <span className="font-body text-[13px] font-bold text-gold-700">
                    {avgRating}
                  </span>
                  <span className="font-body text-[12px] text-neutral-400">
                    ({reviews.length})
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                {
                  label: "Capacity",
                  val: venue.capacity.toLocaleString(),
                  sub: "guests",
                  col: "text-neutral-900",
                },
                {
                  label: "Price",
                  val: venue.price.toLocaleString(),
                  sub: "DA / event",
                  col: "text-burgundy-700",
                },
              ].map((c) => (
                <div
                  key={c.label}
                  className="bg-white rounded-xl border border-neutral-300 p-4 sm:p-5"
                >
                  <p className="font-body text-neutral-500 text-[11px] uppercase tracking-wider mb-1">
                    {c.label}
                  </p>
                  <p
                    className={`font-heading text-[24px] sm:text-[28px] font-bold ${c.col}`}
                  >
                    {c.val}
                  </p>
                  <p className="font-body text-neutral-500 text-[12px]">
                    {c.sub}
                  </p>
                </div>
              ))}
            </div>

            {venue.description && (
              <div className="mb-8">
                <h2 className="font-heading text-neutral-900 text-[20px] font-bold mb-3">
                  About this venue
                </h2>
                <p className="font-body text-neutral-600 text-[14px] leading-relaxed">
                  {venue.description}
                </p>
              </div>
            )}

            {/* Calendar */}
            <div className="mb-10">
              <h2 className="font-heading text-neutral-900 text-[20px] font-bold mb-4">
                Availability
              </h2>
              <div className="bg-white rounded-2xl border border-neutral-300 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => {
                      if (calMonth === 0) {
                        setCalMonth(11);
                        setCalYear((y) => y - 1);
                      } else setCalMonth((m) => m - 1);
                    }}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <p className="font-body font-bold text-neutral-900">
                    {monthNames[calMonth]} {calYear}
                  </p>
                  <button
                    onClick={() => {
                      if (calMonth === 11) {
                        setCalMonth(0);
                        setCalYear((y) => y + 1);
                      } else setCalMonth((m) => m + 1);
                    }}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-7 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div
                      key={d}
                      className="text-center font-body text-[11px] font-bold text-neutral-400 py-1"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`e-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1,
                      ds = fmt(calYear, calMonth, day);
                    const booked = bookedDates.includes(ds),
                      pending = pendingDates.includes(ds);
                    const selected = date === ds,
                      past = isPast(calYear, calMonth, day);
                    return (
                      <button
                        key={day}
                        disabled={booked || pending || past}
                        onClick={() => setDate(ds)}
                        className={`h-9 w-full rounded-lg font-body text-[13px] transition-all
                          ${selected ? "bg-burgundy-700 text-white font-bold" : ""}
                          ${booked ? "bg-error-50 text-error-500 cursor-not-allowed line-through" : ""}
                          ${pending && !booked ? "bg-warning-50 text-warning-700 cursor-not-allowed" : ""}
                          ${past && !booked && !pending ? "text-neutral-300 cursor-not-allowed" : ""}
                          ${!booked && !pending && !past && !selected ? "hover:bg-burgundy-100 hover:text-burgundy-700" : ""}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-neutral-200">
                  {[
                    ["bg-error-50", "Booked"],
                    ["bg-warning-50", "Pending"],
                    ["bg-burgundy-700", "Selected"],
                    ["bg-white border border-neutral-300", "Available"],
                  ].map(([bg, label]) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${bg}`} />
                      <span className="font-body text-[12px] text-neutral-500">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="font-heading text-neutral-900 text-[22px] font-bold mb-5">
                Reviews{" "}
                {reviews.length > 0 && (
                  <span className="text-neutral-400 text-[18px]">
                    ({reviews.length})
                  </span>
                )}
              </h2>
              {reviews.length === 0 ? (
                <div className="bg-white rounded-xl border border-neutral-300 p-10 text-center">
                  <p className="font-body text-neutral-400 text-[14px]">
                    No reviews yet
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {reviews.map((rv) => (
                    <div
                      key={rv.id}
                      className="bg-white rounded-xl border border-neutral-300 p-5 sm:p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-burgundy-100 rounded-full flex items-center justify-center font-heading text-burgundy-700 font-bold">
                            {rv.user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-body font-semibold text-neutral-900 text-[13px]">
                              {rv.user.name}
                            </p>
                            <p className="font-body text-neutral-400 text-[11px]">
                              {new Date(rv.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <img
                              key={s}
                              src="/star.svg"
                              alt=""
                              className="w-3.5 h-3.5"
                              style={{ opacity: s <= rv.rating ? 1 : 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="font-body text-neutral-600 text-[13px] leading-relaxed">
                        {rv.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Booking */}
          <div className="w-full lg:w-[360px] lg:flex-shrink-0">
            <div
              className="bg-white rounded-2xl border border-neutral-300 p-6 sm:p-8 lg:sticky lg:top-24"
              style={{ boxShadow: "0 4px 16px rgba(43,43,43,0.10)" }}
            >
              <h2 className="font-heading text-neutral-900 text-[24px] font-bold mb-1">
                Book this hall
              </h2>
              <p className="font-body text-neutral-600 text-[13px] mb-6">
                Fill in details to send your request
              </p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-body text-[10px] font-bold text-neutral-700 uppercase tracking-[1px] block mb-1.5">
                    Selected Date
                  </label>
                  <div
                    className={`w-full p-3 rounded-lg border font-body text-[13px] ${date ? "border-burgundy-700 text-neutral-900 bg-burgundy-50" : "border-neutral-300 text-neutral-400"}`}
                  >
                    {date
                      ? new Date(date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Select a date from the calendar ↑"}
                  </div>
                </div>
                <div>
                  <label className="font-body text-[10px] font-bold text-neutral-700 uppercase tracking-[1px] block mb-1.5">
                    Number of guests *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={venue.capacity}
                    placeholder={`Max ${venue.capacity}`}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full p-3 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] font-bold text-neutral-700 uppercase tracking-[1px] block mb-1.5">
                    Your Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="0550 000 000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full p-3 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] font-bold text-neutral-700 uppercase tracking-[1px] block mb-1.5">
                    Event type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full p-3 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] bg-white transition-colors"
                  >
                    <option value="">Select type...</option>
                    {[
                      "Wedding",
                      "Engagement",
                      "Birthday",
                      "Graduation",
                      "Corporate",
                      "Other",
                    ].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="border-t border-neutral-200 pt-4 mt-1">
                  <div className="flex justify-between font-body text-[13px] mb-4">
                    <span className="text-neutral-600">Venue price</span>
                    <span className="font-bold text-neutral-900">
                      {venue.price.toLocaleString()} DA
                    </span>
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    disabled={!date || !guests || !clientPhone}
                    className="w-full py-3.5 bg-burgundy-700 text-white font-body font-bold rounded-xl hover:bg-burgundy-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-[14px]"
                  >
                    Request Booking
                  </button>
                  <p className="font-body text-[11px] text-neutral-500 text-center mt-3">
                    The owner will confirm your request
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !success) setShowModal(false);
          }}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-2xl p-7 sm:p-8 w-full sm:max-w-md"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
          >
            {success ? (
              <div className="text-center">
                <div className="w-14 h-14 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="/check.svg" alt="" className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-neutral-900 text-[24px] font-bold mb-2">
                  Request Sent!
                </h3>
                <p className="font-body text-neutral-600 text-[14px] mb-7">
                  Your booking request for <strong>{venue.name}</strong> has
                  been sent. The owner will review and confirm it.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => router.push("/client/reservations")}
                    className="flex-1 py-3 bg-burgundy-700 text-white font-body font-bold rounded-xl hover:bg-burgundy-800 transition-colors text-[13px]"
                  >
                    My Reservations
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSuccess(false);
                    }}
                    className="flex-1 py-3 border border-neutral-300 text-neutral-600 font-body font-bold rounded-xl hover:bg-neutral-50 transition-colors text-[13px]"
                  >
                    Browse More
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-heading text-neutral-900 text-[22px] font-bold mb-1">
                  Confirm Booking
                </h3>
                <p className="font-body text-neutral-600 text-[13px] mb-5">
                  Review your request before sending
                </p>
                <div className="bg-neutral-100 rounded-xl p-4 mb-5 flex flex-col gap-2.5 font-body text-[13px]">
                  {(
                    [
                      ["Venue", venue.name],
                      [
                        "Date",
                        new Date(date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }),
                      ],
                      ["Guests", guests],
                      ["Phone", clientPhone],
                      ...(eventType ? [["Event type", eventType]] : []),
                    ] as [string, string][]
                  ).map(([l, v]) => (
                    <div key={l} className="flex justify-between gap-4">
                      <span className="text-neutral-500">{l}</span>
                      <span className="font-semibold text-neutral-900 text-right">
                        {v}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-neutral-200 pt-2.5 mt-1">
                    <span className="text-neutral-500">Price</span>
                    <span className="font-bold text-burgundy-700">
                      {venue.price.toLocaleString()} DA
                    </span>
                  </div>
                </div>
                {error && (
                  <div className="mb-4 p-3 bg-error-50 border border-error-100 rounded-lg font-body text-error-700 text-[13px]">
                    {error}
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 border border-neutral-300 text-neutral-600 font-body font-bold rounded-xl hover:bg-neutral-50 transition-colors text-[13px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBook}
                    disabled={submitting}
                    className="flex-1 py-3 bg-burgundy-700 text-white font-body font-bold rounded-xl hover:bg-burgundy-800 transition-colors disabled:opacity-50 text-[13px]"
                  >
                    {submitting ? "Sending..." : "Confirm"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
