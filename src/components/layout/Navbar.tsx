"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  // مصفوفة الروابط لتفادي التكرار وجعل التحكم في الـ active state أسهل
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Halls", href: "/browse-halls" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 h-[80.667px] bg-[#FFF] border-b-[0.667px] border-[#E8E8E8] shadow-[0_2px_4px_0_rgba(43,43,43,0.05)] sticky top-0 z-50">
      {/* 1. Logo Section */}
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/logo-icon.svg"
            alt="Afrahi Logo"
            width={128}
            height={48}
          />
        </div>
      </div>

      {/* 2. Navigation Links */}
      <div className="hidden lg:flex items-center space-x-8 font-montserrat text-[16px] font-medium tracking-[-0.16px]">
        {navLinks.map((link) => {
          // نتحقق إذا كان الرابط الحالي هو النشط
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                isActive
                  ? "text-[#7A0019] font-semibold" // Burgundy لما تكون الصفحة نشطة
                  : "text-[#2B2B2B]/70 hover:text-[#7A0019]" // اللون العادي مع الهوفر
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* 3. Actions Section */}
      <div className="flex items-center space-x-6">
        {/* Language Switcher */}
        <div className="flex items-center space-x-1 cursor-pointer text-[#2B2B2B]/70 hover:text-[#7A0019]">
          <Image src="/globe-icon.svg" alt="Language" width={18} height={18} />
          <span className="text-[14px] font-medium font-montserrat">
            العربية
          </span>
        </div>

        {/* Login */}
        <Link
          href="/login"
          className="text-[14px] font-medium font-montserrat text-[#2B2B2B]/70 hover:text-[#7A0019]"
        >
          Login
        </Link>

        {/* Get Started Button */}
        <Link href="/signup">
          <button className="bg-[#7A0019] text-white px-6 py-3 rounded-lg text-[14px] font-semibold font-montserrat hover:bg-[#5a0012] transition-all">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
