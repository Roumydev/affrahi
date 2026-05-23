import React from "react";

const ContactHero = () => {
  return (
    <section
      className="relative w-full h-[400px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url("/contact-hero.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.50) 100%)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center px-[24px]">
        <h1 className="font-cormorant text-white text-5xl md:text-6xl font-bold mb-4">
          Get in Touch
        </h1>
        <p className="font-montserrat text-white/90 text-lg md:text-xl max-w-[700px] mx-auto leading-relaxed">
          Have questions about a venue or need help planning your event? Our
          team is here to assist you every step of the way.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
