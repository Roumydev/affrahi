"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Clock, MessageSquare, CheckCircle, Send } from "lucide-react";
import { useLang } from "@/context/LangContext";

type Stats = {
  totalUsers: number;
  totalVenues: number;
  totalReservations: number;
  pendingReservations: number;
};
type RecentRes = {
  id: string;
  date: string;
  status: string;
  client: { name: string };
  venue: { name: string };
};
type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { name: string };
  venue: { name: string };
};
type Report = {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: string;
  adminReply?: string;
  createdAt: string;
  user: { name: string; email: string; role: string };
};

const statusCfg: Record<
  string,
  { bg: string; text: string; icon: React.ReactNode }
> = {
  pending: {
    bg: "bg-warning-50",
    text: "text-warning-700",
    icon: <Clock size={11} />,
  },
  reviewed: {
    bg: "bg-info-50",
    text: "text-info-700",
    icon: <MessageSquare size={11} />,
  },
  resolved: {
    bg: "bg-success-50",
    text: "text-success-700",
    icon: <CheckCircle size={11} />,
  },
};
const resStat: Record<string, { bg: string; text: string }> = {
  confirmed: { bg: "bg-success-50", text: "text-success-700" },
  rejected: { bg: "bg-error-50", text: "text-error-700" },
  pending: { bg: "bg-warning-50", text: "text-warning-700" },
};

export default function AdminDashboard() {
  const { t, isRTL } = useLang();
  const d = t.adminDash;

  const catLabel: Record<string, string> = {
    technical: d.catTechnical,
    booking: d.catBooking,
    payment: d.catPayment,
    owner: d.catOwner,
    client: d.catClient,
    other: d.catOther,
  };

  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentRes[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [tab, setTab] = useState<"overview" | "reviews" | "reports">(
    "overview",
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [sendingReply, setSendingReply] = useState<string | null>(null);

  useEffect(() => {
    axios.get("/api/admin").then((r) => {
      setStats(r.data.stats);
      setRecent(r.data.recentReservations);
    });
    axios
      .get("/api/admin/reviews")
      .then((r) => setReviews(r.data.reviews || []))
      .catch(() => {});
    axios
      .get("/api/reports")
      .then((r) => setReports(r.data.reports || []))
      .catch(() => {});
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await axios.patch(`/api/reports/${id}`, { status });
      setReports((p) => p.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch {}
    setUpdatingId(null);
  };

  const sendReply = async (id: string) => {
    const reply = replyText[id]?.trim();
    if (!reply) return;
    setSendingReply(id);
    try {
      await axios.patch(`/api/reports/${id}`, {
        adminReply: reply,
        status: "reviewed",
      });
      setReports((p) =>
        p.map((r) =>
          r.id === id ? { ...r, adminReply: reply, status: "reviewed" } : r,
        ),
      );
      setReplyText((p) => ({ ...p, [id]: "" }));
    } catch {}
    setSendingReply(null);
  };

  if (!stats)
    return (
      <div className="p-8 text-center font-body text-neutral-500">
        {d.loading}
      </div>
    );

  const pendingReports = reports.filter((r) => r.status === "pending").length;
  const statCards = [
    {
      label: d.totalUsers,
      val: stats.totalUsers,
      bg: "bg-info-50",
      text: "text-info-700",
    },
    {
      label: d.totalVenues,
      val: stats.totalVenues,
      bg: "bg-success-50",
      text: "text-success-700",
    },
    {
      label: d.totalReservations,
      val: stats.totalReservations,
      bg: "bg-neutral-200",
      text: "text-neutral-700",
    },
    {
      label: d.pending,
      val: stats.pendingReservations,
      bg: "bg-warning-50",
      text: "text-warning-700",
    },
    {
      label: d.reviews,
      val: reviews.length,
      bg: "bg-burgundy-50",
      text: "text-burgundy-700",
    },
    {
      label: d.reports,
      val: reports.length,
      bg: "bg-error-50",
      text: "text-error-700",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100" dir={isRTL ? "rtl" : "ltr"}>
      <div className="bg-white border-b border-neutral-300 px-4 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-burgundy-700 text-[26px] font-bold">
            {d.title}
          </h1>
          <p className="font-body text-neutral-600 text-[13px] mt-0.5">
            {d.subtitle}
          </p>
        </div>
        <button
          onClick={() =>
            axios
              .post("/api/auth/logout")
              .then(() => (window.location.href = "/"))
          }
          className="self-start sm:self-auto font-body text-[13px] text-neutral-500 hover:text-burgundy-700 transition-colors"
        >
          {d.logout}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-7">
          {statCards.map((c) => (
            <div key={c.label} className={`rounded-xl p-4 sm:p-5 ${c.bg}`}>
              <p
                className={`font-body text-[10px] font-bold uppercase tracking-wide ${c.text} opacity-70`}
              >
                {c.label}
              </p>
              <p
                className={`font-heading text-[28px] font-bold mt-1 ${c.text}`}
              >
                {c.val}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-7">
          {[
            {
              href: "/admin/users",
              label: d.allUsers,
              style: "bg-burgundy-700 text-white hover:bg-burgundy-800",
            },
            {
              href: "/admin/venues",
              label: d.manageVenues,
              style:
                "bg-white border border-burgundy-700 text-burgundy-700 hover:bg-burgundy-50",
            },
            {
              href: "/admin/reservations",
              label: d.allReservations,
              style:
                "bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100",
            },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-5 py-2.5 rounded-xl font-body font-semibold text-[13px] transition-colors ${l.style}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { key: "overview", label: d.tabOverview },
            { key: "reviews", label: d.tabReviews(reviews.length) },
            {
              key: "reports",
              label: d.tabReports(reports.length, pendingReports),
            },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className={`px-4 py-2.5 rounded-lg font-body font-medium text-[13px] transition-all ${tab === t.key ? "bg-burgundy-700 text-white" : "bg-white border border-neutral-300 text-neutral-600 hover:border-burgundy-700"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div
            className="bg-white rounded-2xl border border-neutral-300 overflow-hidden"
            style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.07)" }}
          >
            <div className="px-6 py-4 border-b border-neutral-200">
              <h2 className="font-heading text-neutral-900 text-[20px] font-bold">
                {d.recentReservations}
              </h2>
            </div>
            <div className="divide-y divide-neutral-100">
              {recent.map((r) => {
                const cfg = resStat[r.status] || resStat.pending;
                return (
                  <div
                    key={r.id}
                    className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-body font-semibold text-neutral-900 text-[14px]">
                        {r.client.name} → {r.venue.name}
                      </p>
                      <p className="font-body text-neutral-500 text-[12px] mt-0.5">
                        {new Date(r.date).toLocaleDateString(
                          isRTL ? "ar-DZ" : "en-GB",
                          { day: "numeric", month: "long", year: "numeric" },
                        )}
                      </p>
                    </div>
                    <span
                      className={`self-start sm:self-auto font-body text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${cfg.bg} ${cfg.text}`}
                    >
                      {r.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div className="flex flex-col gap-4">
            {reviews.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-neutral-300">
                <p className="font-body text-neutral-400">{d.noReviews}</p>
              </div>
            ) : (
              reviews.map((rv) => (
                <div
                  key={rv.id}
                  className="bg-white rounded-2xl border border-neutral-300 p-5 sm:p-6"
                  style={{ boxShadow: "0 2px 4px rgba(43,43,43,0.06)" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-burgundy-100 rounded-full flex items-center justify-center font-heading text-burgundy-700 font-bold">
                        {rv.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-body font-semibold text-neutral-900 text-[13px]">
                          {rv.user.name}
                        </p>
                        <p className="font-body text-neutral-500 text-[11px]">
                          {new Date(rv.createdAt).toLocaleDateString(
                            isRTL ? "ar-DZ" : "en-GB",
                            { day: "numeric", month: "long", year: "numeric" },
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-body text-[11px] text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
                        {rv.venue.name}
                      </span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <img
                            key={s}
                            src="/star.svg"
                            alt=""
                            className="w-3 h-3"
                            style={{ opacity: s <= rv.rating ? 1 : 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="font-body text-neutral-600 text-[13px] leading-relaxed">
                    {rv.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "reports" && (
          <div className="flex flex-col gap-4">
            {reports.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-neutral-300">
                <p className="font-body text-neutral-400">{d.noReports}</p>
              </div>
            ) : (
              reports.map((rp) => {
                const cfg = statusCfg[rp.status] || statusCfg.pending;
                return (
                  <div
                    key={rp.id}
                    className="bg-white rounded-2xl border border-neutral-300 overflow-hidden"
                    style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.07)" }}
                  >
                    <div
                      className={`h-1 ${rp.status === "resolved" ? "bg-success-500" : rp.status === "reviewed" ? "bg-info-500" : "bg-warning-500"}`}
                    />
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span
                              className={`inline-flex items-center gap-1 font-body text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${cfg.bg} ${cfg.text}`}
                            >
                              {cfg.icon}
                              {rp.status}
                            </span>
                            <span className="font-body text-neutral-500 text-[11px] bg-neutral-100 px-2 py-0.5 rounded-full">
                              {catLabel[rp.category] || rp.category}
                            </span>
                          </div>
                          <h3 className="font-heading text-neutral-900 text-[19px] font-bold">
                            {rp.subject}
                          </h3>
                          <p className="font-body text-neutral-600 text-[12px] mt-0.5">
                            {rp.user.name} ({rp.user.email}) · {rp.user.role}
                          </p>
                        </div>
                        <span className="font-body text-neutral-400 text-[11px] flex-shrink-0">
                          {new Date(rp.createdAt).toLocaleDateString(
                            isRTL ? "ar-DZ" : "en-GB",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </span>
                      </div>
                      <p className="font-body text-neutral-700 text-[13px] leading-relaxed bg-neutral-50 rounded-xl p-4 mb-4">
                        {rp.description}
                      </p>
                      {rp.adminReply && (
                        <div className="mb-4 bg-info-50 border border-info-100 rounded-xl p-4">
                          <p className="font-body text-[10px] font-bold text-info-700 uppercase tracking-wide mb-1">
                            {d.adminReply}
                          </p>
                          <p className="font-body text-info-700 text-[13px] leading-relaxed">
                            {rp.adminReply}
                          </p>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 flex gap-2">
                          <input
                            value={replyText[rp.id] || ""}
                            onChange={(e) =>
                              setReplyText((p) => ({
                                ...p,
                                [rp.id]: e.target.value,
                              }))
                            }
                            placeholder={d.replyPh}
                            onKeyDown={(e) =>
                              e.key === "Enter" && sendReply(rp.id)
                            }
                            className="flex-1 px-3 py-2.5 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] transition-colors"
                          />
                          <button
                            onClick={() => sendReply(rp.id)}
                            disabled={
                              sendingReply === rp.id ||
                              !replyText[rp.id]?.trim()
                            }
                            className="px-3.5 py-2.5 bg-burgundy-700 text-white rounded-lg hover:bg-burgundy-800 transition-colors disabled:opacity-40"
                          >
                            <Send size={14} />
                          </button>
                        </div>
                        <div className="flex gap-2">
                          {rp.status !== "resolved" && (
                            <button
                              disabled={updatingId === rp.id}
                              onClick={() => updateStatus(rp.id, "resolved")}
                              className="px-4 py-2.5 bg-success-50 text-success-700 border border-success-100 rounded-lg font-body text-[12px] font-semibold hover:bg-success-100 transition-colors disabled:opacity-50"
                            >
                              {d.resolve}
                            </button>
                          )}
                          {rp.status === "pending" && (
                            <button
                              disabled={updatingId === rp.id}
                              onClick={() => updateStatus(rp.id, "reviewed")}
                              className="px-4 py-2.5 bg-info-50 text-info-700 border border-info-100 rounded-lg font-body text-[12px] font-semibold hover:bg-info-100 transition-colors disabled:opacity-50"
                            >
                              {d.markReviewed}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
