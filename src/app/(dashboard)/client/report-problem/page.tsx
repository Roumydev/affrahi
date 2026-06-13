"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { useLang } from "@/context/LangContext";

type Report = {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: string;
  adminReply?: string;
  createdAt: string;
};

export default function ReportProblemPage() {
  const [form, setForm] = useState({
    subject: "",
    category: "technical",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [myReports, setMyReports] = useState<Report[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useLang();
  const rp = t.reportPage;

  const statusConfig = {
    pending: {
      label: rp.statusPending,
      color: "bg-yellow-100 text-yellow-700",
      icon: <Clock size={12} />,
    },
    reviewed: {
      label: rp.statusReviewed,
      color: "bg-blue-100 text-blue-700",
      icon: <MessageSquare size={12} />,
    },
    resolved: {
      label: rp.statusResolved,
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle size={12} />,
    },
  };

  const categoryLabels: Record<string, string> = {
    technical: rp.technical,
    booking: rp.booking,
    payment: rp.payment,
    owner: rp.owner,
    other: rp.other,
  };

  const fetchReports = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    try {
      const res = await axios.get("/api/reports/mine");
      setMyReports(res.data.reports || []);
    } catch {
    } finally {
      setLoadingReports(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSubmit = async () => {
    if (!form.subject.trim() || !form.description.trim()) {
      setError(rp.fillAll);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await axios.post("/api/reports", form);
      setSuccess(true);
      setForm({ subject: "", category: "technical", description: "" });
      await fetchReports();
    } catch {
      setError(rp.failedSubmit);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-10">
      <div>
        <div className="mb-8">
          <h2 className="text-zinc-800 text-3xl font-bold">{rp.title}</h2>
          <p className="text-neutral-400 text-sm mt-1">{rp.subtitle}</p>
        </div>
        {success ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center text-center shadow-sm">
            <div className="p-5 bg-green-50 rounded-full mb-5">
              <CheckCircle size={36} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {rp.successTitle}
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              {rp.successDesc}
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-8 py-3 bg-[#8B1538] text-white rounded-xl font-bold hover:bg-[#6d102c] transition"
            >
              {rp.submitAnother}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                {rp.category}
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm text-zinc-800 focus:outline-none focus:border-[#8B1538] focus:ring-1 focus:ring-[#8B1538] transition bg-white"
              >
                <option value="technical">{rp.technical}</option>
                <option value="booking">{rp.booking}</option>
                <option value="payment">{rp.payment}</option>
                <option value="owner">{rp.owner}</option>
                <option value="other">{rp.other}</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                {rp.subject}
              </label>
              <input
                type="text"
                placeholder={rp.subjectPh}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm text-zinc-800 placeholder-neutral-400 focus:outline-none focus:border-[#8B1538] focus:ring-1 focus:ring-[#8B1538] transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                {rp.description}
              </label>
              <textarea
                rows={6}
                placeholder={rp.descriptionPh}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm text-zinc-800 placeholder-neutral-400 focus:outline-none focus:border-[#8B1538] resize-none transition"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-3.5 bg-[#8B1538] text-white font-bold rounded-xl hover:bg-[#6d102c] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? rp.submitting : rp.submit}
            </button>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-zinc-800">{rp.myReports}</h3>
          <button
            onClick={() => fetchReports(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-sm text-[#8B1538] font-semibold hover:opacity-70 transition disabled:opacity-40"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? rp.refreshing : rp.refresh}
          </button>
        </div>
        {loadingReports ? (
          <p className="text-gray-400 text-sm">{rp.loading}</p>
        ) : myReports.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
            <p className="text-gray-400 text-sm">{rp.noReports}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {myReports.map((report) => {
              const sc =
                (statusConfig as any)[report.status] || statusConfig.pending;
              return (
                <div
                  key={report.id}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-bold text-gray-800">
                        {report.subject}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {categoryLabels[report.category] || report.category} ·{" "}
                        {new Date(report.createdAt).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "long", year: "numeric" },
                        )}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${sc.color}`}
                    >
                      {sc.icon} {sc.label}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{report.description}</p>
                  {report.adminReply && (
                    <div className="bg-[#F9F1F3] border border-[#e8c4cf] rounded-xl p-4 flex flex-col gap-1">
                      <p className="text-xs font-bold text-[#8B1538] uppercase tracking-wide">
                        {rp.adminReply}
                      </p>
                      <p className="text-sm text-gray-700">
                        {report.adminReply}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
