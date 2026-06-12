"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const icons = ["/calendar.svg", "/check.svg", "/sparkle.svg"];
const nums = ["01", "02", "03"];

const HowItWorks = () => {
  const { t } = useLang();
  const h = t.howItWorks;
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <span className="font-body text-burgundy-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
          {h.badge}
        </span>
        <h2 className="font-heading text-neutral-900 text-[32px] sm:text-[52px] font-bold text-center mb-14 leading-tight">
          {h.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full">
          {h.steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="relative mb-5">
                <div className="w-14 h-14 bg-burgundy-100 rounded-full flex items-center justify-center">
                  <img src={icons[i]} alt={s.title} className="w-7 h-7" />
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-burgundy-700 text-white rounded-full font-body text-[9px] font-bold flex items-center justify-center">
                  {nums[i]}
                </span>
              </div>
              <h3 className="font-body text-neutral-900 text-[15px] font-bold mb-2">
                {s.title}
              </h3>
              <p className="font-body text-neutral-600 text-[13px] leading-relaxed max-w-[210px]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
