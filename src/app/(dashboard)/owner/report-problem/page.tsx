"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import axios from "axios";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

type Report = {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: string;
  adminReply?: string;
  createdAt: string;
};

const categoryLabel: Record<string, string> = {
  technical: "Technical Issue",
  booking: "Booking Problem",
  payment: "Payment Issue",
  client: "Problem with Client",
  other: "Other",
};

const statusConfig: Record<
  string,
  { label: string; color: string; icon: ReactNode }
> = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
    icon: <Clock size={12} />,
  },
  reviewed: {
    label: "Reviewed",
    color: "bg-blue-100 text-blue-700",
    icon: <MessageSquare size={12} />,
  },
  resolved: {
    label: "Resolved",
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle size={12} />,
  },
};

export default function OwnerReportProblemPage() {
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

  const fetchReports = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    try {
      const res = await axios.get("/api/reports/mine");
      setMyReports(res.data.reports || []);
    } catch {
      // silent
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
      setError("Please fill in all fields.");
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
      setError("Failed to submit report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full px-8 py-10 flex flex-row gap-10 items-start">
      {/* ===== LEFT: FORM ===== */}
      <div className="flex-1">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            Report a Problem
          </h2>
          <p className="text-[#4A4A4A] text-sm mt-1">
            Let us know about any issue and we'll look into it
          </p>
        </div>

        {success ? (
          <div className="bg-white rounded-xl border border-[#E8E6E3] p-12 flex flex-col items-center text-center shadow-sm">
            <div className="p-5 bg-green-50 rounded-full mb-5">
              <CheckCircle size={36} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
              Report Submitted!
            </h3>
            <p className="text-[#4A4A4A] text-sm mb-6 max-w-xs">
              Your report has been sent to our admin team. We'll review it as
              soon as possible.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-8 py-3 bg-[#8B1538] text-white rounded-xl font-bold hover:bg-[#6d102c] transition"
            >
              Submit Another Report
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#E8E6E3] p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[1px]">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 border border-[#E8E6E3] rounded-lg text-sm text-[#1A1A1A] focus:outline-none focus:border-[#8B1538] transition bg-white"
              >
                <option value="technical">Technical Issue</option>
                <option value="booking">Booking Problem</option>
                <option value="payment">Payment Issue</option>
                <option value="client">Problem with Client</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[1px]">
                Subject *
              </label>
              <input
                type="text"
                placeholder="Brief description of the problem"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 border border-[#E8E6E3] rounded-lg text-sm text-[#1A1A1A] placeholder-[#6F6D67] focus:outline-none focus:border-[#8B1538] transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[1px]">
                Description *
              </label>
              <textarea
                rows={6}
                placeholder="Describe the problem in detail..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full px-4 py-3 border border-[#E8E6E3] rounded-lg text-sm text-[#1A1A1A] placeholder-[#6F6D67] focus:outline-none focus:border-[#8B1538] resize-none transition"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-3.5 bg-[#8B1538] text-white font-bold rounded-lg hover:bg-[#6d102c] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        )}
      </div>

      {/* ===== RIGHT: MY REPORTS ===== */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#1A1A1A]">My Reports</h3>
          <button
            onClick={() => fetchReports(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-sm text-[#8B1538] font-semibold hover:opacity-70 transition disabled:opacity-40"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loadingReports ? (
          <p className="text-[#4A4A4A] text-sm">Loading...</p>
        ) : myReports.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E8E6E3] p-10 text-center shadow-sm">
            <p className="text-[#6F6D67] text-sm">No reports submitted yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {myReports.map((report) => {
              const sc = statusConfig[report.status] || statusConfig.pending;
              return (
                <div
                  key={report.id}
                  className="bg-white rounded-xl border border-[#E8E6E3] p-6 flex flex-col gap-3 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-bold text-[#1A1A1A] text-lg">
                        {report.subject}
                      </h4>
                      <span className="text-xs text-[#6F6D67]">
                        {categoryLabel[report.category] || report.category} ·{" "}
                        {new Date(report.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${sc.color}`}
                    >
                      {sc.icon} {sc.label}
                    </span>
                  </div>

                  <p className="text-[#4A4A4A] text-sm leading-relaxed">
                    {report.description}
                  </p>

                  {report.adminReply && (
                    <div className="bg-[#F9F1F3] border border-[#e8c4cf] rounded-xl p-4 flex flex-col gap-1 mt-2">
                      <p className="text-xs font-bold text-[#8B1538] uppercase tracking-wide">
                        Admin Reply
                      </p>
                      <p className="text-sm text-[#1A1A1A] font-medium pl-1">
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
