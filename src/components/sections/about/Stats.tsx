"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const icons = [
  "/icon-clients.svg",
  "/star.svg",
  "/icon-experience.svg",
  "/icon-venues.svg",
];
const values = ["5,000+", "10,000+", "15+", "50+"];
const iconFilter =
  "brightness(0) saturate(100%) invert(14%) sepia(61%) saturate(3755%) hue-rotate(334deg) brightness(91%) contrast(98%)";

const Stats = () => {
  const { t } = useLang();
  const s = t.about.stats;
  const labels = [
    s.happyClients,
    s.eventsHosted,
    s.yearsExperience,
    s.partnerVenues,
  ];
  return (
    <section className="w-full bg-neutral-100 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {labels.map((label, i) => (
          <div
            key={i}
            className="bg-white flex flex-col items-center justify-center p-6 sm:p-10 rounded-2xl border border-neutral-300"
            style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.07)" }}
          >
            <div className="w-10 h-10 bg-burgundy-100 rounded-full flex items-center justify-center mb-4">
              <img
                src={icons[i]}
                alt={label}
                className="w-5 h-5"
                style={{ filter: iconFilter }}
              />
            </div>
            <span className="font-heading text-burgundy-700 text-[32px] sm:text-[40px] font-bold leading-none mb-1">
              {values[i]}
            </span>
            <span className="font-body text-neutral-500 text-[10px] sm:text-[11px] uppercase tracking-wider text-center">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
