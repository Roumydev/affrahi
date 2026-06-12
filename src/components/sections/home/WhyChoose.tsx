"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const icons = ["/star.svg", "/calendar.svg", "/check.svg", "/shield.svg"];

const WhyChooseUs = () => {
  const { t } = useLang();
  const w = t.whyChoose;
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-neutral-200">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <span className="font-body text-burgundy-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
          {w.badge}
        </span>
        <h2 className="font-heading text-neutral-900 text-[32px] sm:text-[44px] font-bold text-center mb-12 sm:mb-14 leading-tight">
          {w.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 w-full">
          {w.features.map((f, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-11 h-11 bg-burgundy-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <img src={icons[i]} alt={f.title} className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-body text-neutral-900 text-[15px] font-bold mb-1.5">
                  {f.title}
                </h3>
                <p className="font-body text-neutral-600 text-[13px] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
