"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const icons = [
  "/icon-venues.svg",
  "/icon-clients.svg",
  "/sparkle.svg",
  "/globe-icon.svg",
];
const values = ["150+", "5,000+", "12,000+", "48+"];

const Stats = () => {
  const { t } = useLang();
  const s = t.stats;
  const labels = [
    s.luxuryVenues,
    s.happyClients,
    s.eventsHosted,
    s.citiesCovered,
  ];
  return (
    <section className="w-full bg-white border-b border-neutral-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {labels.map((label, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2">
            <div className="w-9 h-9 bg-burgundy-100 rounded-full flex items-center justify-center mb-1">
              <img src={icons[i]} alt="" className="w-4 h-4" />
            </div>
            <span className="font-heading text-burgundy-700 text-[34px] sm:text-[44px] font-bold leading-none">
              {values[i]}
            </span>
            <span className="font-body text-neutral-500 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] font-medium">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
