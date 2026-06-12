"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

const Footer = () => {
  const { t } = useLang();
  const f = t.footer;
  return (
    <footer className="bg-neutral-900 text-white pt-14 pb-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div>
          <h2 className="font-heading text-gold-500 text-[32px] font-bold mb-3">
            Afrahi
          </h2>
          <p className="font-body text-neutral-400 text-[14px] leading-relaxed max-w-[260px]">
            {f.desc}
          </p>
        </div>
        <div>
          <h4 className="font-body text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-5">
            {f.quickLinks}
          </h4>
          <ul className="flex flex-col gap-3 font-body text-[14px] text-neutral-300">
            {f.links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-gold-500 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-body text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-5">
            {f.contact}
          </h4>
          <div className="flex flex-col gap-4 font-body text-[14px] text-neutral-300">
            {[
              { icon: "/email.svg", text: "info@afrahi.com" },
              { icon: "/phone.svg", text: "+213 550 123 456" },
              { icon: "/location.svg", text: "Hydra, Alger, Algérie" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <img
                  src={icon}
                  alt=""
                  className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
                />
                <span className="group-hover:text-gold-500 transition-colors">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800 mt-12 pt-6 text-center font-body text-[11px] text-neutral-600 tracking-wide">
        {f.rights}
      </div>
    </footer>
  );
};

export default Footer;
