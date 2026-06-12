"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const FAQPreview = () => {
  const { t } = useLang();
  const f = t.contact.faq;
  return (
    <section className="w-full px-4 sm:px-6 pb-16 sm:pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="bg-neutral-100 border border-neutral-300 rounded-2xl flex flex-col items-center justify-center text-center px-6 py-14 sm:py-16">
          <span className="font-body text-burgundy-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
            {f.badge}
          </span>
          <h2 className="font-heading text-neutral-900 text-[28px] sm:text-[38px] font-bold mb-4 leading-tight">
            {f.title}
          </h2>
          <p className="font-body text-neutral-600 text-[13px] sm:text-[15px] max-w-lg mb-8 leading-relaxed">
            {f.desc}
          </p>
          <button
            onClick={() => (window.location.href = "/faqs")}
            className="border-2 border-burgundy-700 text-burgundy-700 px-10 py-3.5 rounded-lg font-body font-bold text-[14px] hover:bg-burgundy-700 hover:text-white transition-all duration-200"
          >
            {f.viewFaqs}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQPreview;
