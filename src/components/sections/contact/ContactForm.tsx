"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const ContactForm = () => {
  const { t } = useLang();
  const f = t.contact.form;
  return (
    <section className="w-full bg-neutral-100 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className="bg-white rounded-2xl border border-neutral-300 p-7 sm:p-12"
          style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.07)" }}
        >
          <div className="mb-8 sm:mb-10">
            <span className="font-body text-burgundy-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
              {f.badge}
            </span>
            <h2 className="font-heading text-neutral-900 text-[28px] sm:text-[38px] font-bold mb-3 leading-tight">
              {f.title}
            </h2>
            <p className="font-body text-neutral-600 text-[14px] sm:text-[15px]">
              {f.desc}
            </p>
          </div>
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                [f.firstName, f.firstNamePh, "text"],
                [f.lastName, f.lastNamePh, "text"],
              ].map(([label, ph, type]) => (
                <div key={label} className="flex flex-col gap-2">
                  <label className="font-body text-[11px] font-bold text-neutral-900 uppercase tracking-[1px]">
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={ph}
                    className="w-full p-3 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] text-neutral-900 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                [f.email, f.emailPh, "email"],
                [f.phone, f.phonePh, "tel"],
              ].map(([label, ph, type]) => (
                <div key={label} className="flex flex-col gap-2">
                  <label className="font-body text-[11px] font-bold text-neutral-900 uppercase tracking-[1px]">
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={ph}
                    className="w-full p-3 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] text-neutral-900 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-body text-[11px] font-bold text-neutral-900 uppercase tracking-[1px]">
                {f.message}
              </label>
              <textarea
                rows={5}
                placeholder={f.messagePh}
                className="w-full p-3 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] text-neutral-900 resize-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-burgundy-700 text-white font-body font-bold rounded-lg hover:bg-burgundy-800 transition-colors text-[14px] flex items-center justify-center gap-3"
            >
              {f.send}
              <img
                src="/send.svg"
                alt=""
                className="w-4 h-4 invert brightness-0"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
