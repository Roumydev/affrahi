"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

const Hero = () => {
  const { t } = useLang();
  const h = t.hero;
  return (
    <section
      className="relative w-full min-h-[520px] sm:min-h-[580px] flex flex-col items-center justify-center text-center px-4 sm:px-6"
      style={{
        backgroundImage: `linear-gradient(180deg,rgba(75,10,33,0.58) 0%,rgba(43,7,22,0.68) 100%),url('/hero-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-3xl w-full flex flex-col items-center z-10">
        <span className="font-body text-gold-400 text-[11px] font-bold uppercase tracking-[0.22em] mb-5">
          {h.badge}
        </span>
        <h1 className="font-heading text-white text-[38px] sm:text-[54px] md:text-[68px] font-bold leading-[1.06] mb-5 drop-shadow-lg">
          {h.title1}
          <br className="hidden sm:block" /> {h.title2}
        </h1>
        <p className="font-body text-white/85 text-[15px] sm:text-[17px] mb-10 max-w-xl leading-relaxed">
          {h.desc}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
          <Link href="/browse-halls" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-gold-500 text-neutral-900 px-8 py-3.5 rounded-lg font-body font-bold text-[14px] hover:bg-gold-400 transition-all shadow-lg">
              {h.exploreHalls}
            </button>
          </Link>
          <Link href="/signup" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto border-2 border-white/70 text-white px-8 py-3.5 rounded-lg font-body font-semibold text-[14px] hover:bg-white/10 transition-all">
              {h.listVenue}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
