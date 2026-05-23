"use client";

import React from "react";
import Button from "../../ui/Button"; // تأكدي من مسار المكون عندك

const FAQPreview = () => {
  return (
    <section className="w-full px-[24px] pb-20">
      <div
        className="w-full flex flex-col items-center justify-center text-center bg-[#F9F9F9]"
        style={{
          borderRadius: "12px",
          border: "0.667px solid #E8E6E3",
          height: "302.302px", // الارتفاع من Figma
          paddingTop: "47.33px", // المسافة العلوية من Figma
        }}
      >
        {/* العنوان */}
        <h2 className="font-cormorant text-[#1A1A1A] text-[32px] md:text-[40px] font-bold mb-4">
          Frequently Asked Questions
        </h2>

        {/* النص الوصفي */}
        <p className="font-montserrat text-[#4A4A4A] text-[14px] md:text-[16px] max-w-[600px] mb-8 leading-relaxed">
          Before reaching out, you might find answers to common questions in our
          FAQ section.
        </p>

        {/* زر الانتقال - مع زيادة الـ Padding الداخلي */}
        <Button
          variant="outline"
          /* أضفت py-4 لزيادة المساحة من فوق وتحت داخل الزر */
          className="!border-[#8B1538] !text-[#8B1538] hover:!bg-[#8B1538]/5 px-12 py-4 min-w-[210px] text-sm md:text-base font-bold"
          onClick={() => (window.location.href = "/faqs")}
        >
          View FAQs
        </Button>
      </div>
    </section>
  );
};

export default FAQPreview;
