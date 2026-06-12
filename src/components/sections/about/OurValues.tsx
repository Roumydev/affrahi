"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const icons = ["/heart.svg", "/shield.svg", "/icon-experience.svg"];
const iconFilter =
  "brightness(0) saturate(100%) invert(14%) sepia(61%) saturate(3755%) hue-rotate(334deg) brightness(91%) contrast(98%)";

const OurValues = () => {
  const { t } = useLang();
  const v = t.about.values;
  return (
    <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <span className="font-body text-burgundy-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
            {v.badge}
          </span>
          <h2 className="font-heading text-neutral-900 text-[32px] sm:text-[44px] font-bold leading-tight">
            {v.title}
          </h2>
          <p className="font-body text-neutral-600 text-[14px] sm:text-[15px] mt-3">
            {v.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {v.items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-7 sm:p-8 rounded-2xl border border-neutral-300 bg-burgundy-50 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-burgundy-100 rounded-full flex items-center justify-center mb-5">
                <img
                  src={icons[i]}
                  alt={item.title}
                  className="w-6 h-6"
                  style={{ filter: iconFilter }}
                />
              </div>
              <h3 className="font-heading text-neutral-900 text-[22px] font-bold mb-3">
                {item.title}
              </h3>
              <p className="font-body text-neutral-600 text-[13px] sm:text-[14px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
