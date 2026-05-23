import React from "react";

const ContactMap = () => {
  return (
    <section className="w-full px-[24px] pb-16">
      <div className="relative w-full h-[400px] rounded-[12px] overflow-hidden border border-[#E8E6E3] shadow-sm bg-[#F9F9F9]">
        <img
          src="/map-bg.png"
          alt="Office Location Map"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-6 left-6 flex flex-col gap-3">
          <div
            className="p-4 bg-white flex items-center gap-4 min-w-[280px]"
            style={{
              borderRadius: "12px",
              border: "0.667px solid #E8E6E3",
              boxShadow: "0 8px 20px -5px rgba(43, 43, 43, 0.1)",
            }}
          >
            <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-[#FDF6F7] rounded-full">
              <img
                src="/clock.svg"
                alt="Clock"
                className="w-5 h-5 object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(14%) sepia(61%) saturate(3755%) hue-rotate(334deg) brightness(91%) contrast(98%)",
                }}
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-montserrat text-[#8B1538] text-[10px] font-bold uppercase tracking-widest">
                Working Hours
              </span>
              <p className="font-montserrat text-sm text-[#1A1A1A] font-semibold mt-0.5">
                Sunday - Thursday: 9AM - 6PM
              </p>
              <p className="font-montserrat text-sm text-[#1A1A1A] font-semibold mt-0.5">
                Saturday: 10AM - 4PM
              </p>
            </div>
          </div>

          <div
            className="p-4 bg-white flex items-center gap-4 min-w-[280px]"
            style={{
              borderRadius: "12px",
              border: "0.667px solid #E8E6E3",
              boxShadow: "0 8px 20px -5px rgba(43, 43, 43, 0.1)",
            }}
          >
            <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-[#FDF6F7] rounded-full">
              <img
                src="/location.svg"
                alt="Marker"
                className="w-5 h-5 object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(14%) sepia(61%) saturate(3755%) hue-rotate(334deg) brightness(91%) contrast(98%)",
                }}
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-montserrat text-[#8B1538] text-[10px] font-bold uppercase tracking-widest">
                Location
              </span>
              <h4 className="font-cormorant font-bold text-[#1A1A1A] text-lg leading-tight mt-0.5">
                Our Main Office
              </h4>
              <p className="font-montserrat text-[12px] text-[#4A4A4A] mt-1">
                123 Didouche Mourad Street, Algiers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
