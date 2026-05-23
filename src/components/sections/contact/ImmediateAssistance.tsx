"use client";

import React from "react";
import Button from "../../ui/Button";

const ImmediateAssistance = () => {
  return (
    <section className="w-full px-[24px] pb-16">
      <div
        className="w-full flex flex-col gap-[24px] px-8 py-[48px] md:px-12 text-left bg-white"
        style={{
          borderRadius: "12px",
          border: "0.667px solid #E8E6E3",
          boxShadow: "0 4px 8px -2px rgba(43, 43, 43, 0.08)",
          minHeight: "224px",
        }}
      >
        {/* قسم النصوص */}
        <div className="flex flex-col gap-3">
          <h3 className="font-cormorant text-[#1A1A1A] text-[28px] md:text-[32px] font-bold leading-tight">
            Need Immediate Assistance?
          </h3>
          <p className="font-montserrat text-[#4A4A4A] text-[14px] md:text-[16px] leading-relaxed max-w-[600px]">
            For urgent inquiries or immediate support, please call us directly.
            Our team is ready to assist you with any questions about bookings,
            venues, or event planning.
          </p>
        </div>

        {/* قسم الأزرار */}
        <div className="flex flex-wrap items-center gap-4">
          {/* زر الاتصال - الخلفية عنابية والخط عنابي؟ (عادة يكون الخط أبيض فوق العنابي) 
              لكن حسب طلبك جعلت الأيقونة Burgundy كالكتابة */}
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-8 py-3"
            onClick={() => (window.location.href = "tel:+213000000000")}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                backgroundColor: "white", // لون برغندي (نفس لون الكتابة)
                maskImage: 'url("/phone-white.svg")',
                WebkitMaskImage: 'url("/phone-white.svg")',
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskSize: "contain",
                WebkitMaskSize: "contain",
              }}
            />
            <span className="font-montserrat font-bold text-white">
              Call Now
            </span>
          </Button>

          {/* زر الإيميل - Outline */}
          <Button
            variant="outline"
            className="flex items-center gap-2 px-8 py-3 !border-[#8B1538] !text-[#8B1538] hover:!bg-[#8B1538]/5 transition-all"
            onClick={() => (window.location.href = "mailto:support@afrahi.dz")}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                backgroundColor: "#8B1538", // لون برغندي
                maskImage: 'url("/email.svg")',
                WebkitMaskImage: 'url("/email.svg")',
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskSize: "contain",
                WebkitMaskSize: "contain",
              }}
            />
            <span className="font-montserrat font-bold">Email Us</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ImmediateAssistance;
