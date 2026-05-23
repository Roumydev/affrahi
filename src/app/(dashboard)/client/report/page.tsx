import React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageSquare,
  Send,
  Trash2,
} from "lucide-react";

export default function ReportProblemPage() {
  const recentReports = [
    {
      id: 1,
      subject: "Payment not reflected",
      category: "Payment Problem",
      date: "April 25, 2026",
      status: "In Progress",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 2,
      subject: "Hall owner not responding",
      category: "Communication Issue",
      date: "April 20, 2026",
      status: "Resolved",
      statusColor: "bg-green-100 text-green-700",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="space-y-1">
        <h2 className="text-zinc-800 text-2xl font-medium font-['Inter']">
          Report a Problem
        </h2>
        <p className="text-neutral-500 text-base font-normal font-['Inter']">
          Having an issue? Let us know and we'll help resolve it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-2xl border border-stone-300 space-y-6">
          <h3 className="text-zinc-800 text-xl font-medium font-['Inter']">
            Submit a New Report
          </h3>

          <div className="space-y-4">
            {/* Subject */}
            <div className="space-y-2">
              <label className="text-zinc-800 text-sm font-medium font-['Inter']">
                Subject
              </label>
              <input
                type="text"
                placeholder="Brief description of the issue"
                className="w-full px-4 py-3 bg-white rounded-[10px] border border-stone-300 focus:outline-none focus:ring-1 focus:ring-rose-900 transition-all"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-zinc-800 text-sm font-medium font-['Inter']">
                Category
              </label>
              <select className="w-full px-4 py-3 bg-white rounded-[10px] border border-stone-300 focus:outline-none focus:ring-1 focus:ring-rose-900 appearance-none transition-all">
                <option value="">Select a category</option>
                <option value="payment">Payment Problem</option>
                <option value="technical">Technical Issue</option>
                <option value="communication">Communication Issue</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-zinc-800 text-sm font-medium font-['Inter']">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Please provide detailed information about your issue..."
                className="w-full px-4 py-3 bg-white rounded-[10px] border border-stone-300 focus:outline-none focus:ring-1 focus:ring-rose-900 transition-all resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#8B1538] text-white rounded-[10px] hover:bg-[#6d102c] transition-all font-medium">
                <Send size={18} />
                Submit Report
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-zinc-800 border border-stone-300 rounded-[10px] hover:bg-gray-50 transition-all font-medium">
                <Trash2 size={18} />
                Clear Form
              </button>
            </div>
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="bg-white p-6 rounded-2xl border border-stone-300 space-y-4">
          <h3 className="text-zinc-800 text-xl font-medium font-['Inter']">
            Recent Reports
          </h3>

          <div className="space-y-3">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex justify-between items-center p-4 bg-stone-50 rounded-[10px] border border-transparent hover:border-stone-200 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#8B1538]/10 rounded-[10px] text-[#8B1538]">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-zinc-800 font-medium font-['Inter']">
                      {report.subject}
                    </h4>
                    <div className="flex items-center gap-2 text-neutral-500 text-sm">
                      <span>{report.category}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`px-4 py-1 rounded-[10px] text-sm font-normal ${report.statusColor}`}
                >
                  {report.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
