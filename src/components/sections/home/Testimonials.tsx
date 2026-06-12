"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const Stars = ({ n }: { n: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <img
        key={s}
        src="/star.svg"
        alt=""
        className="w-3.5 h-3.5"
        style={{ opacity: s <= n ? 1 : 0.2 }}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const { t } = useLang();
  const tm = t.testimonials;
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-neutral-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-14">
          <span className="font-body text-burgundy-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
            {tm.badge}
          </span>
          <h2 className="font-heading text-neutral-900 text-[32px] sm:text-[46px] font-bold leading-tight">
            {tm.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tm.reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-neutral-300 p-6 flex flex-col gap-4"
              style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.06)" }}
            >
              <Stars n={5} />
              <p className="font-body text-neutral-700 text-[13px] leading-relaxed flex-1">
                "{r.quote}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-neutral-200">
                <div className="w-9 h-9 bg-burgundy-100 rounded-full flex items-center justify-center font-heading text-burgundy-700 font-bold text-[15px]">
                  {r.init}
                </div>
                <div>
                  <p className="font-body text-neutral-900 text-[13px] font-semibold">
                    {r.name}
                  </p>
                  <p className="font-body text-neutral-500 text-[12px]">
                    {r.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
