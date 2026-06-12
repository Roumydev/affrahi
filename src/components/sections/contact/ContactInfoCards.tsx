"use client";
import React from "react";
import { useLang } from "@/context/LangContext";

const iconFilter =
  "brightness(0) saturate(100%) invert(14%) sepia(61%) saturate(3755%) hue-rotate(334deg) brightness(91%) contrast(98%)";

const ContactInfoCards = () => {
  const { t } = useLang();
  const info = t.contact.info;
  const details = [
    {
      title: info.phone,
      info1: "+213 550 123 456",
      info2: "+213 770 987 654",
      icon: "/phone.svg",
    },
    {
      title: info.email,
      info1: "info@afrahi.dz",
      info2: "support@afrahi.dz",
      icon: "/email.svg",
    },
    {
      title: info.office,
      info1: info.officeAddress1,
      info2: info.officeAddress2,
      icon: "/location.svg",
    },
    {
      title: info.workingHours,
      info1: info.hours1,
      info2: info.hours2,
      icon: "/clock.svg",
    },
  ];
  return (
    <section className="w-full bg-white py-12 sm:py-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {details.map((d, i) => (
          <div
            key={i}
            className="flex items-start gap-5 px-6 py-7 sm:py-8 rounded-2xl border border-neutral-300 bg-white hover:shadow-md transition-all duration-300"
            style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.07)" }}
          >
            <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-burgundy-100 rounded-full">
              <img
                src={d.icon}
                alt={d.title}
                className="w-5 h-5"
                style={{ filter: iconFilter }}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-heading text-neutral-900 text-[18px] sm:text-[20px] font-bold mb-1">
                {d.title}
              </h3>
              <p className="font-body text-neutral-600 text-[13px] sm:text-[14px] leading-relaxed">
                {d.info1}
              </p>
              <p className="font-body text-neutral-600 text-[13px] sm:text-[14px] leading-relaxed">
                {d.info2}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfoCards;
