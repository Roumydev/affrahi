"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const OurStory = () => {
  const { t } = useLang();
  const s = t.about.story;
  return (
    <section className="w-full bg-white pt-16 sm:pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <div>
          <span className="font-body text-burgundy-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
            {s.badge}
          </span>
          <h2 className="font-heading text-neutral-900 text-[36px] sm:text-[48px] font-bold mb-6 leading-tight">
            {s.title}
          </h2>
          <div className="flex flex-col gap-5 font-body text-neutral-600 text-[15px] sm:text-[16px] leading-relaxed max-w-3xl">
            <p>{s.p1}</p>
            <p>{s.p2}</p>
          </div>
        </div>
        <div
          className="w-full h-[280px] sm:h-[380px] rounded-2xl overflow-hidden"
          style={{
            backgroundImage: 'url("/our-story-palace.png")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          }}
        />
      </div>
    </section>
  );
};

export default OurStory;
