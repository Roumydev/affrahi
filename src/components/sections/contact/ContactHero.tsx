"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const ContactHero = () => {
  const { t } = useLang();
  const h = t.contact.hero;
  return (
    <section
      className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url("/contact-hero.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg,rgba(75,10,33,0.72) 0%,rgba(43,7,22,0.55) 100%)",
        }}
      />
      <div className="relative z-10 text-center px-4 sm:px-6">
        <span className="font-body text-gold-400 text-[11px] font-bold uppercase tracking-[0.22em] mb-4 block">
          {h.badge}
        </span>
        <h1 className="font-heading text-white text-[40px] sm:text-[56px] font-bold mb-4 leading-tight">
          {h.title}
        </h1>
        <p className="font-body text-white/90 text-[15px] sm:text-[17px] max-w-xl mx-auto leading-relaxed">
          {h.desc}
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
