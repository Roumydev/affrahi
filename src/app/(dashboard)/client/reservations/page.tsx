"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

type Reservation = {
  id: string;
  date: string;
  status: string;
  guests: number;
  eventType?: string;
  venue: { name: string; location: string; price: number };
};
const statusCfg: Record<string, { bg: string; text: string }> = {
  confirmed: { bg: "bg-success-50", text: "text-success-700" },
  rejected: { bg: "bg-error-50", text: "text-error-700" },
  pending: { bg: "bg-warning-50", text: "text-warning-700" },
};

export default function MyReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLang();
  const r = t.reservationsPage;

  useEffect(() => {
    axios.get("/api/reservations").then((res) => {
      setReservations(res.data.reservations || []);
      setLoading(false);
    });
  }, []);

  const handleCancel = async (id: string) => {
    if (!confirm(r.confirmCancel)) return;
    try {
      await axios.delete(`/api/reservations/${id}`);
      setReservations((p) => p.filter((res) => res.id !== id));
    } catch {}
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <p className="font-body text-neutral-500">{r.loading}</p>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-neutral-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-7">
          <h2 className="font-heading text-neutral-900 text-[28px] font-bold">
            {r.title}
          </h2>
          <span className="font-body text-neutral-500 text-[13px]">
            {r.reservations(reservations.length)}
          </span>
        </div>

        {reservations.length === 0 && (
          <div className="bg-white rounded-2xl p-12 sm:p-16 text-center border border-neutral-300">
            <div className="w-14 h-14 bg-burgundy-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="/calendar.svg" alt="" className="w-7 h-7" />
            </div>
            <p className="font-body text-neutral-600 text-[15px] mb-5">
              {r.noReservations}
            </p>
            <Link
              href="/browse-halls"
              className="inline-block px-6 py-2.5 bg-burgundy-700 text-white rounded-lg font-body text-[13px] font-semibold hover:bg-burgundy-800 transition-colors"
            >
              {r.browseHalls}
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {reservations.map((res) => {
            const cfg = statusCfg[res.status] || statusCfg.pending;
            return (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-neutral-300 overflow-hidden"
                style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.07)" }}
              >
                <div
                  className={`h-1 w-full ${res.status === "confirmed" ? "bg-success-500" : res.status === "rejected" ? "bg-error-500" : "bg-warning-500"}`}
                />
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-heading text-neutral-900 text-[21px] font-bold">
                        {res.venue.name}
                      </h3>
                      <div className="flex items-center gap-2 text-neutral-500 mt-1">
                        <img
                          src="/location-pin.svg"
                          alt=""
                          className="w-3.5 h-3.5"
                        />
                        <span className="font-body text-[13px]">
                          {res.venue.location}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`self-start px-3 py-1.5 rounded-full font-body text-[10px] font-bold uppercase tracking-wider ${cfg.bg} ${cfg.text}`}
                    >
                      {res.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 p-4 bg-neutral-100 rounded-xl mb-4">
                    {[
                      {
                        icon: "/calendar.svg",
                        label: r.date,
                        val: new Date(res.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }),
                      },
                      {
                        icon: "/users.svg",
                        label: r.guestCount,
                        val: `${res.guests} ${r.guests}`,
                      },
                      {
                        icon: "/sparkle.svg",
                        label: r.eventType,
                        val: res.eventType || "—",
                      },
                      {
                        icon: "/phone.svg",
                        label: r.venuePrice,
                        val: `${res.venue.price.toLocaleString()} DA`,
                      },
                    ].map(({ icon, label, val }) => (
                      <div key={label} className="flex items-start gap-2.5">
                        <img
                          src={icon}
                          alt=""
                          className="w-4 h-4 mt-0.5 opacity-60"
                        />
                        <div>
                          <p className="font-body text-neutral-500 text-[11px]">
                            {label}
                          </p>
                          <p className="font-body text-neutral-900 text-[13px] font-semibold">
                            {val}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {res.status === "pending" && (
                      <button
                        onClick={() => handleCancel(res.id)}
                        className="px-5 py-2 border border-error-500 text-error-700 rounded-lg font-body font-semibold text-[13px] hover:bg-error-50 transition-colors"
                      >
                        {r.cancel}
                      </button>
                    )}
                    {res.status === "confirmed" && (
                      <Link
                        href="/browse-halls"
                        className="inline-block px-5 py-2 bg-burgundy-700 text-white rounded-lg font-body font-semibold text-[13px] hover:bg-burgundy-800 transition-colors"
                      >
                        {r.bookAnother}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
