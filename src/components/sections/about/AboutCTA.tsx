"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

const AboutCTA = () => {
  const { t } = useLang();
  const c = t.about.cta;
  return (
    <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 sm:px-14 py-12 sm:py-16 rounded-2xl border border-neutral-300"
          style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.08)" }}
        >
          <div className="flex flex-col gap-3 max-w-xl text-center md:text-left">
            <h2 className="font-heading text-neutral-900 text-[30px] sm:text-[42px] font-bold leading-tight">
              {c.title}
            </h2>
            <p className="font-body text-neutral-600 text-[14px] sm:text-[15px] leading-relaxed">
              {c.desc}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <Link href="/browse-halls" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-burgundy-700 text-white px-8 py-3.5 rounded-lg font-body font-bold text-[14px] hover:bg-burgundy-800 transition-colors min-w-[160px]">
                {c.getStarted}
              </button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto border-2 border-burgundy-700 text-burgundy-700 px-8 py-3.5 rounded-lg font-body font-bold text-[14px] hover:bg-burgundy-50 transition-colors min-w-[160px]">
                {c.contactUs}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
