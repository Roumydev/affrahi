import React from "react";

const iconFilter =
  "brightness(0) saturate(100%) invert(14%) sepia(61%) saturate(3755%) hue-rotate(334deg) brightness(91%) contrast(98%)";

const ContactMap = () => (
  <section className="w-full px-4 sm:px-6 pb-12 sm:pb-14">
    <div className="max-w-5xl mx-auto">
      <div
        className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-neutral-300"
        style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.08)" }}
      >
        <img
          src="/map-bg.png"
          alt="Office Location"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex flex-col gap-3">
          {[
            {
              icon: "/clock.svg",
              label: "Working Hours",
              lines: ["Sunday–Thursday: 9AM–6PM", "Saturday: 10AM–4PM"],
            },
            {
              icon: "/location.svg",
              label: "Location",
              lines: ["Our Main Office", "123 Didouche Mourad, Algiers"],
            },
          ].map((c) => (
            <div
              key={c.label}
              className="bg-white flex items-center gap-4 p-4 rounded-xl min-w-[240px] sm:min-w-[280px]"
              style={{
                border: "1px solid #E8E6E3",
                boxShadow: "0 8px 20px rgba(43,43,43,0.10)",
              }}
            >
              <div className="flex-shrink-0 w-9 h-9 bg-burgundy-100 rounded-full flex items-center justify-center">
                <img
                  src={c.icon}
                  alt=""
                  className="w-4 h-4"
                  style={{ filter: iconFilter }}
                />
              </div>
              <div>
                <span className="font-body text-burgundy-700 text-[9px] font-bold uppercase tracking-widest block">
                  {c.label}
                </span>
                {c.lines.map((l) => (
                  <p
                    key={l}
                    className="font-body text-neutral-900 text-[12px] sm:text-[13px] font-semibold leading-snug"
                  >
                    {l}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ContactMap;
