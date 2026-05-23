import React from "react";
import { Clock, CheckCircle, Heart, Calendar } from "lucide-react";

export default function ClientDashboardContent() {
  return (
    <>
      <header className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-lg mt-2 font-medium">
          Here's an overview of your reservations
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <StatCard
          label="Active"
          value="3"
          icon={<Clock size={28} className="text-[#8B1538]" />}
          bg="bg-[#F9F1F3]"
        />
        <StatCard
          label="Completed"
          value="8"
          icon={<CheckCircle size={28} className="text-[#2D9B63]" />}
          bg="bg-[#F1F9F4]"
        />
        <StatCard
          label="Favorites"
          value="5"
          icon={<Heart size={28} className="text-[#E05B5B]" />}
          bg="bg-[#FDF2F2]"
        />
        <StatCard
          label="Upcoming"
          value="2"
          icon={<Calendar size={28} className="text-[#4A69E2]" />}
          bg="bg-[#F2F5FD]"
        />
      </div>

      <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
        <h3 className="text-2xl font-bold mb-8 text-gray-800">
          Upcoming Reservations
        </h3>
        <div className="space-y-6">
          <ReservationRow
            name="Royal Grand Ballroom"
            date="June 15, 2026"
            type="Wedding"
            guests="300 guests"
            status="Confirmed"
            statusBg="bg-green-50 text-green-700"
          />
          <ReservationRow
            name="Golden Palm Hall"
            date="July 25, 2026"
            type="Graduation"
            guests="200 guests"
            status="Pending"
            statusBg="bg-orange-50 text-orange-700"
          />
        </div>
      </div>
    </>
  );
}

// --- Helper Components ---
function StatCard({ label, value, icon, bg }: any) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-50 flex flex-col items-center shadow-sm">
      <div className={`p-5 ${bg} rounded-3xl mb-4`}>{icon}</div>
      <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
        {label}
      </p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}

function ReservationRow({ name, date, type, guests, status, statusBg }: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-[#F9F8F6] rounded-3xl">
      <div className="flex items-center space-x-6">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#8B1538] shadow-sm">
          <Calendar size={24} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-800">{name}</h4>
          <p className="text-gray-500 text-sm">
            {date} • {type} • {guests}
          </p>
        </div>
      </div>
      <span
        className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase ${statusBg}`}
      >
        {status}
      </span>
    </div>
  );
}
