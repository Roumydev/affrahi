import React from "react";

const AboutHero = () => {
  return (
    <section
      className="relative w-full h-[480px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url("/about-hero-bg.png")',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.50) 100%)",
        }}
      ></div>

      <div className="relative z-10 w-full max-w-[924px] px-6 text-center">
        <h1 className="text-white text-6xl md:text-7xl font-bold font-cormorant mb-6 tracking-tight leading-tight">
          About Afrahi
        </h1>
        <p className="text-white/95 text-xl md:text-2xl font-montserrat max-w-3xl mx-auto leading-relaxed">
          Your trusted partner for luxury event hall bookings in Algeria
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
