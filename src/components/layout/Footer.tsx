import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react"; // لازم تدير: npm install lucide-react

const Footer = () => {
  return (
    <footer className="bg-[#2B2B2B] text-white pt-[48px] pb-[32px] px-[24px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {/* العمود 1: Brand & Description */}
        <div className="flex flex-col items-start">
          <h2 className="text-[#C9A962] font-['Cormorant_Garamond'] text-[36px] font-bold leading-[43.2px] tracking-[-0.72px] mb-4">
            Afrahi
          </h2>
          <p className="text-[#E8E6E3] text-[18px] leading-[1.6] font-montserrat opacity-80 max-w-[300px]">
            Luxury event hall booking platform for weddings, celebrations and
            unforgettable moments in Algeria. [cite: 10]
          </p>
        </div>

        {/* العمود 2: Quick Links */}
        <div className="flex flex-col items-start md:pl-10">
          <h4 className="text-[18px] font-bold mb-6 font-montserrat text-white">
            Quick Links
          </h4>
          <ul className="space-y-3 text-[16px] text-[#E8E6E3] font-montserrat">
            <li>
              <Link href="/" className="hover:text-[#C9A962] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="hover:text-[#C9A962] transition-colors"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-[#C9A962] transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/get-started"
                className="hover:text-[#C9A962] transition-colors"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>

        {/* العمود 3: Contact Info (الأيقونات الجديدة هنا) */}
        <div className="flex flex-col items-start">
          <h4 className="text-[18px] font-bold mb-6 font-montserrat text-white">
            Contact
          </h4>
          <div className="space-y-5 text-[16px] text-[#E8E6E3] font-montserrat">
            {/* Email */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-[#C9A962] group-hover:scale-110 transition-transform">
                <Mail size={18} strokeWidth={2} />
              </div>
              <span className="group-hover:text-[#C9A962] transition-colors">
                info@afrahi.com
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-[#C9A962] group-hover:scale-110 transition-transform">
                <Phone size={18} strokeWidth={2} />
              </div>
              <span className="group-hover:text-[#C9A962] transition-colors">
                +213 550 123 456
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-[#C9A962] group-hover:scale-110 transition-transform">
                <MapPin size={18} strokeWidth={2} />
              </div>
              <span className="group-hover:text-[#C9A962] transition-colors">
                Hydra, Alger, Algérie
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="border-t border-[#4A4A4A] mt-12 pt-8 text-center text-[12px] text-[#E8E6E3] opacity-60 font-montserrat">
        © 2026 Afrahi. All rights reserved. [cite: 94]
      </div>
    </footer>
  );
};

export default Footer;
