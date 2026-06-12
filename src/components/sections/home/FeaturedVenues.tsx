"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

type Venue = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  price: number;
  image?: string;
};

const Skel = () => (
  <div className="bg-white rounded-2xl border border-neutral-300 overflow-hidden animate-pulse">
    <div className="h-52 bg-neutral-200" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-5 bg-neutral-200 rounded w-3/4" />
      <div className="h-4 bg-neutral-200 rounded w-1/2" />
      <div className="h-10 bg-neutral-200 rounded mt-2" />
    </div>
  </div>
);

const FeaturedVenues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLang();
  const f = t.featured;

  useEffect(() => {
    axios
      .get("/api/venues")
      .then((r) => {
        setVenues(r.data.venues.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="bg-neutral-100 px-4 sm:px-6 py-16 sm:py-20 flex flex-col items-center">
      <span className="font-body text-burgundy-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
        {f.badge}
      </span>
      <h2 className="font-heading text-neutral-900 text-[32px] sm:text-[46px] font-bold text-center mb-10 sm:mb-12 leading-tight">
        {f.title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[900px] w-full">
        {loading ? (
          [0, 1, 2, 3].map((i) => <Skel key={i} />)
        ) : venues.length === 0 ? (
          <div className="col-span-2 text-center py-16 text-neutral-500 font-body">
            {f.noVenues}
          </div>
        ) : (
          venues.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl border border-neutral-300 overflow-hidden flex flex-col group"
              style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.07)" }}
            >
              <div className="h-52 overflow-hidden bg-neutral-200">
                {v.image ? (
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-300 text-5xl">
                    🏛️
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-heading text-neutral-900 text-[21px] font-bold leading-tight">
                  {v.name}
                </h3>
                <div className="flex items-center gap-2 text-neutral-500">
                  <img src="/location-pin.svg" className="w-4 h-4" alt="" />
                  <span className="font-body text-[13px]">{v.location}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-500">
                  <img src="/people.svg" className="w-4 h-4" alt="" />
                  <span className="font-body text-[13px]">
                    {v.capacity} {f.guests}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-200">
                  <div>
                    <p className="font-body text-neutral-400 text-[10px] uppercase tracking-wider">
                      {f.perEvent}
                    </p>
                    <p className="font-body text-burgundy-700 text-[17px] font-bold">
                      {v.price.toLocaleString()} DA
                    </p>
                  </div>
                  <Link
                    href={`/browse-halls/${v.id}`}
                    className="bg-burgundy-700 text-white px-5 py-2.5 rounded-lg font-body text-[13px] font-semibold hover:bg-burgundy-800 transition-colors"
                  >
                    {f.viewDetails}
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Link
        href="/browse-halls"
        className="mt-10 sm:mt-12 px-8 py-3 border border-burgundy-700 text-burgundy-700 rounded-lg font-body font-semibold text-[14px] hover:bg-burgundy-700 hover:text-white transition-all duration-200"
      >
        {f.seeAll}
      </Link>
    </section>
  );
};

export default FeaturedVenues;
