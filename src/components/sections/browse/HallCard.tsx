"use client";
import { Heart, MapPin } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

type Props = {
  id: string;
  name: string;
  location: string;
  price: number;
  image?: string;
  isWishlisted: boolean;
  loadingWishlist: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
};

export default function HallCard({
  id,
  name,
  location,
  price,
  image,
  isWishlisted,
  loadingWishlist,
  onToggleWishlist,
}: Props) {
  const { t } = useLang();
  const b = t.browse;
  return (
    <div className="relative group">
      <button
        onClick={onToggleWishlist}
        disabled={loadingWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md transition-all duration-200 ${isWishlisted ? "bg-burgundy-700 text-white" : "bg-white text-neutral-400 hover:text-burgundy-700"}`}
      >
        <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
      </button>
      <Link href={`/browse-halls/${id}`}>
        <div
          className="bg-white rounded-2xl overflow-hidden border border-neutral-300 hover:border-burgundy-200 transition-all duration-300 group-hover:-translate-y-0.5"
          style={{ boxShadow: "0 2px 4px rgba(43,43,43,0.06)" }}
        >
          <div className="h-44 sm:h-48 bg-neutral-200 overflow-hidden">
            <img
              src={image || "/venues/dar-el-bahia.png"}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <h3 className="font-heading text-neutral-900 text-[19px] font-bold leading-tight mb-2 truncate">
              {name}
            </h3>
            <div className="flex items-center gap-1.5 text-neutral-500 mb-4">
              <MapPin size={13} />
              <span className="font-body text-[13px]">{location}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
              <div>
                <p className="font-body text-neutral-400 text-[10px] uppercase tracking-wider">
                  {b.perEvent}
                </p>
                <p className="font-body text-burgundy-700 text-[16px] font-bold">
                  {price.toLocaleString()} DA
                </p>
              </div>
              <div className="bg-burgundy-100 text-burgundy-700 px-4 py-2 rounded-lg font-body text-[12px] font-semibold group-hover:bg-burgundy-700 group-hover:text-white transition-all duration-200">
                {b.viewDetails}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
