"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  CalendarCheck,
  MessageSquare,
  Star,
  AlertCircle,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  // مصفوفة العناصر باش الكود يكون منظم
  const menuItems = [
    { icon: <LayoutDashboard size={22} />, label: "Overview", href: "/client" },
    { icon: <Heart size={22} />, label: "Wishlist", href: "/client/wishlist" },
    {
      icon: <CalendarCheck size={22} />,
      label: "My Reservations",
      href: "/client/reservations",
    },
    {
      icon: <MessageSquare size={22} />,
      label: "Messages",
      href: "/client/messages",
    },
    { icon: <Star size={22} />, label: "Reviews", href: "/client/reviews" },
    {
      icon: <AlertCircle size={22} />,
      label: "Report a Problem",
      href: "/client/report",
    },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col p-8 sticky top-0 h-screen">
      {/* Logo Section */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-[#8B1538]">Afrahi</h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">
          Client Dashboard
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          // التحقق إذا كان الرابط هو الصفحة الحالية
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center space-x-4 p-4 rounded-2xl transition-all cursor-pointer mb-1 ${
                  isActive
                    ? "bg-[#8B1538] text-white shadow-lg shadow-red-900/20"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                <span className={isActive ? "font-semibold" : "font-medium"}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button className="flex items-center space-x-3 text-red-600 font-bold p-4 mt-auto border-t border-gray-50 w-full hover:bg-red-50 rounded-xl transition-all">
        <LogOut size={22} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
