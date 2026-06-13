"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import {
  LayoutDashboard,
  Heart,
  CalendarCheck,
  MessageSquare,
  Star,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLang();
  const s = t.sidebar;

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/");
  };

  const menuItems = [
    { icon: <LayoutDashboard size={22} />, label: s.overview, href: "/client" },
    { icon: <Heart size={22} />, label: s.wishlist, href: "/client/wishlist" },
    {
      icon: <CalendarCheck size={22} />,
      label: s.myReservations,
      href: "/client/reservations",
    },
    {
      icon: <MessageSquare size={22} />,
      label: s.messages,
      href: "/client/messages",
    },
    { icon: <Star size={22} />, label: s.reviews, href: "/client/reviews" },
    {
      icon: <AlertCircle size={22} />,
      label: s.reportProblem,
      href: "/client/report-problem",
    },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col p-8 sticky top-0 h-screen">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-[#8B1538]">Afrahi</h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">
          {s.clientDashboard}
        </p>
      </div>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center space-x-4 p-4 rounded-2xl transition-all cursor-pointer mb-1 ${isActive ? "bg-[#8B1538] text-white shadow-lg shadow-red-900/20" : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"}`}
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
      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 text-red-600 font-bold p-4 mt-auto border-t border-gray-50 w-full hover:bg-red-50 rounded-xl transition-all"
      >
        <LogOut size={22} />
        <span>{s.logout}</span>
      </button>
    </aside>
  );
}
