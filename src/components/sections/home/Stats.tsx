import React from "react";

const Stats = () => {
  const stats = [
    { value: "150+", label: "Luxury Venues" },
    { value: "5,000+", label: "Happy Clients" },
    { value: "12,000+", label: "Events Hosted" },
    { value: "48+", label: "Cities Covered" },
  ];

  return (
    <section
      className="w-full bg-[#FFFFFF]"
      style={{
        borderBottom: "0.667px solid #E8E6E3",
      }}
    >
      {/* 1. max-w-7xl: يحدد أقصى عرض للمحتوى باش ما يتفتحش بزاف في الشاشات الكبيرة.
         2. mx-auto: يخلي المحتوى يجي في النص (يعطيك نفس الفراغ يمين ويسار).
         3. px-8 md:px-16: يزيد الـ Padding الجانبي (Espace).
         4. py-16: يخلي الـ Padding الفوق والتحت متساوي (64px تعادل py-16).
      */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 flex flex-row justify-between items-center gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <span className="text-[#8B1538] font-cormorant text-[32px] md:text-[45px] font-bold leading-none">
              {stat.value}
            </span>
            <span className="text-[#4A4A4A] font-montserrat text-[11px] md:text-[13px] uppercase tracking-[0.1em] mt-2 opacity-80">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
