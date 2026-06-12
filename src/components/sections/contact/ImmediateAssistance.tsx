"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const ImmediateAssistance = () => {
  const { t } = useLang();
  const u = t.contact.urgent;
  return (
    <section className="w-full px-4 sm:px-6 pb-12 sm:pb-14">
      <div className="max-w-5xl mx-auto">
        <div
          className="bg-white flex flex-col gap-6 px-7 sm:px-12 py-10 sm:py-12 rounded-2xl border border-neutral-300"
          style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.08)" }}
        >
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="font-body text-burgundy-600 text-[11px] font-bold uppercase tracking-[0.2em]">
              {u.badge}
            </span>
            <h3 className="font-heading text-neutral-900 text-[26px] sm:text-[32px] font-bold leading-tight">
              {u.title}
            </h3>
            <p className="font-body text-neutral-600 text-[13px] sm:text-[15px] leading-relaxed">
              {u.desc}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => (window.location.href = "tel:+213000000000")}
              className="flex items-center gap-2.5 bg-burgundy-700 text-white px-7 py-3 rounded-lg font-body font-bold text-[14px] hover:bg-burgundy-800 transition-colors"
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: "white",
                  maskImage: 'url("/phone-white.svg")',
                  WebkitMaskImage: 'url("/phone-white.svg")',
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                }}
              />
              {u.callNow}
            </button>
            <button
              onClick={() =>
                (window.location.href = "mailto:support@afrahi.dz")
              }
              className="flex items-center gap-2.5 border-2 border-burgundy-700 text-burgundy-700 px-7 py-3 rounded-lg font-body font-bold text-[14px] hover:bg-burgundy-50 transition-colors"
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: "#8B1538",
                  maskImage: 'url("/email.svg")',
                  WebkitMaskImage: 'url("/email.svg")',
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                }}
              />
              {u.emailUs}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImmediateAssistance;
