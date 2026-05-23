import React from "react";
import Button from "../../ui/Button";

const AboutCTA = () => {
  return (
    <section className="w-full bg-white pt-10 pb-20 px-[24px] flex justify-center">
      <div
        // التعديل هنا: زدنا py-[64px] لزيادة ارتفاع البطاقة بـ 24px
        className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-between gap-8 px-10 md:px-16 py-[64px] text-center md:text-left"
        style={{
          borderRadius: "12px",
          border: "0.667px solid #E8E6E3",
          background: "rgba(255, 255, 255, 0.00)",
          boxShadow: "0 4px 8px -2px rgba(43, 43, 43, 0.08)",
        }}
      >
        <div className="flex flex-col gap-4 max-w-[650px]">
          <h2 className="font-cormorant text-[#1A1A1A] text-4xl md:text-5xl font-bold leading-tight">
            Ready to find your perfect venue?
          </h2>
          <p className="font-montserrat text-[#4A4A4A] text-lg">
            Join thousands of happy clients who found their dream event space
            with Afrahi.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="secondary" className="min-w-[180px]">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="min-w-[180px] !border-[#8B1538] !text-[#8B1538] hover:!bg-[#8B1538]/5"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
