"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

const ReadyToBook = () => {
  const { t } = useLang();
  const r = t.readyToBook;
  return (
    <section
      className="w-full py-16 sm:py-20 px-4 sm:px-6 text-center text-white"
      style={{ background: "linear-gradient(135deg,#8B1538 0%,#4F0A21 100%)" }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <span className="font-body text-gold-400 text-[11px] font-bold uppercase tracking-[0.22em] mb-4">
          {r.badge}
        </span>
        <h2 className="font-heading text-[32px] sm:text-[48px] font-bold mb-5 leading-tight">
          {r.title}
        </h2>
        <p className="font-body text-white/80 text-[15px] max-w-lg mb-10 leading-relaxed">
          {r.desc}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
          <Link href="/browse-halls" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 text-neutral-900 font-body font-bold py-3.5 px-10 rounded-lg transition-all text-[13px] uppercase tracking-wider shadow-lg">
              {r.exploreHalls}
            </button>
          </Link>
          <Link href="/signup" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto border-2 border-white/50 text-white font-body font-semibold py-3.5 px-10 rounded-lg hover:bg-white/10 transition-all text-[13px]">
              {r.createAccount}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReadyToBook;
