"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const AboutHero = () => {
  const { t } = useLang();
  const h = t.about.hero;
  return (
    <section
      className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url("/about-hero-bg.png")' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg,rgba(75,10,33,0.72) 0%,rgba(43,7,22,0.55) 100%)",
        }}
      />
      <div className="relative z-10 w-full max-w-3xl px-4 sm:px-6 text-center">
        <span className="font-body text-gold-400 text-[11px] font-bold uppercase tracking-[0.22em] mb-4 block">
          {h.badge}
        </span>
        <h1 className="font-heading text-white text-[44px] sm:text-[60px] md:text-[72px] font-bold mb-5 leading-tight">
          {h.title}
        </h1>
        <p className="font-body text-white/90 text-[15px] sm:text-[18px] max-w-xl mx-auto leading-relaxed">
          {h.desc}
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
