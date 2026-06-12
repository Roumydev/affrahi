"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const MissionVision = () => {
  const { t } = useLang();
  const { mission, vision } = t.about;
  return (
    <section className="w-full bg-neutral-100 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        {[
          { ...mission, accent: "bg-burgundy-700" },
          { ...vision, accent: "bg-gold-600" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-neutral-300 p-8 sm:p-10 flex flex-col gap-5"
            style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.07)" }}
          >
            <div className={`w-1 h-10 rounded-full ${item.accent}`} />
            <h2 className="font-heading text-neutral-900 text-[28px] sm:text-[36px] font-bold leading-tight">
              {item.title}
            </h2>
            <p className="font-body text-neutral-600 text-[14px] sm:text-[15px] leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionVision;
