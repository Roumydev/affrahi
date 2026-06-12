"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLang } from "@/context/LangContext";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t, toggleLang, isRTL } = useLang();

  const links = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.browseHalls, href: "/browse-halls" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.contact, href: "/contact" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-white border-b border-neutral-300"
      style={{ boxShadow: "0 2px 4px rgba(43,43,43,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        <Link href="/" className="flex-shrink-0">
          <Image src="/logo-icon.svg" alt="Afrahi" width={110} height={40} />
        </Link>

        <div
          className={`hidden lg:flex items-center gap-7 font-body text-[14px] font-medium ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition-colors duration-150 ${pathname === l.href ? "text-burgundy-700 font-semibold" : "text-neutral-600 hover:text-burgundy-700"}`}
            >
              {l.name}
            </Link>
          ))}
        </div>

        <div
          className={`hidden lg:flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 cursor-pointer text-neutral-500 hover:text-burgundy-700 transition-colors"
          >
            <Image src="/globe-icon.svg" alt="lang" width={15} height={15} />
            <span className="font-body text-[13px] font-medium">
              {t.nav.lang}
            </span>
          </button>
          <Link
            href="/login"
            className="font-body text-[13px] font-medium text-neutral-600 hover:text-burgundy-700 transition-colors"
          >
            {t.nav.login}
          </Link>
          <Link href="/signup">
            <button className="bg-burgundy-700 text-white px-5 py-2.5 rounded-lg font-body text-[13px] font-semibold hover:bg-burgundy-800 transition-colors">
              {t.nav.getStarted}
            </button>
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-neutral-600 hover:text-burgundy-700 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-neutral-200 px-4 pb-5 pt-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-body text-[15px] font-medium py-2.5 px-2 rounded-lg transition-colors ${pathname === l.href ? "text-burgundy-700 bg-burgundy-50 font-semibold" : "text-neutral-700 hover:bg-neutral-100"}`}
            >
              {l.name}
            </Link>
          ))}
          <div className="border-t border-neutral-200 mt-3 pt-4 flex flex-col gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 font-body text-[14px] font-medium text-neutral-500 py-2 px-2"
            >
              <Image src="/globe-icon.svg" alt="lang" width={15} height={15} />
              {t.nav.lang}
            </button>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="font-body text-[14px] font-medium text-neutral-600 py-2 px-2"
            >
              {t.nav.login}
            </Link>
            <Link href="/signup" onClick={() => setOpen(false)}>
              <button className="w-full bg-burgundy-700 text-white py-2.5 rounded-lg font-body text-[14px] font-semibold hover:bg-burgundy-800 transition-colors">
                {t.nav.getStarted}
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
