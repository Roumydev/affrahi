"use client";

import React from "react";
import Button from "../../ui/Button"; // تأكدي من المسار الصحيح

const ContactForm = () => {
  return (
    <section className="w-full bg-white py-16 px-[24px]">
      <div
        className="w-full p-8 md:p-12" // أصبحت w-full بدل max-w-[800px] لتأخذ العرض الكامل
        style={{
          borderRadius: "12px",
          border: "0.667px solid #E8E6E3",
          background: "rgba(255, 255, 255, 0.00)",
          boxShadow: "0 4px 8px -2px rgba(43, 43, 43, 0.08)",
        }}
      >
        {/* Header */}
        <div className="text-left mb-10">
          <h2 className="font-cormorant text-[#1A1A1A] text-4xl font-bold mb-4">
            Send Us a Message
          </h2>
          <p className="font-montserrat text-[#4A4A4A]">
            Fill out the form below and our team will get back to you within 24
            hours.
          </p>
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-sm font-semibold text-[#1A1A1A]">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full p-4 rounded-lg border border-[#E8E6E3] focus:outline-none focus:border-[#8B1538] font-montserrat text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-sm font-semibold text-[#1A1A1A]">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full p-4 rounded-lg border border-[#E8E6E3] focus:outline-none focus:border-[#8B1538] font-montserrat text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-sm font-semibold text-[#1A1A1A]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="youremail@example.com"
                className="w-full p-4 rounded-lg border border-[#E8E6E3] focus:outline-none focus:border-[#8B1538] font-montserrat text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-sm font-semibold text-[#1A1A1A]">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+213 --- --- ---"
                className="w-full p-4 rounded-lg border border-[#E8E6E3] focus:outline-none focus:border-[#8B1538] font-montserrat text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-montserrat text-sm font-semibold text-[#1A1A1A]">
              Your Message
            </label>
            <textarea
              rows={5}
              placeholder="How can we help you?"
              className="w-full p-4 rounded-lg border border-[#E8E6E3] focus:outline-none focus:border-[#8B1538] font-montserrat text-sm resize-none"
            ></textarea>
          </div>

          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-[17px] pt-[14.667px] pb-[16.438px] px-0"
          >
            <span className="font-montserrat font-bold text-white">
              Send Message
            </span>
            <img
              src="/send.svg"
              alt="send"
              className="w-5 h-5 object-contain invert brightness-0"
            />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
