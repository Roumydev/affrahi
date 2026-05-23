import React from "react";

// 1. Definition of the Props Interface for TypeScript
interface ReservationCardProps {
  title: string;
  location: string;
  status: string;
  date: string;
  guests: string;
  type: string;
  total: string;
  paid: string;
  statusColor: string;
  actions: React.ReactNode;
}

// 2. ReservationCard Component with SVG Icons
const ReservationCard = ({
  title,
  location,
  status,
  date,
  guests,
  type,
  total,
  paid,
  statusColor,
  actions,
}: ReservationCardProps) => (
  <div className="w-full p-6 bg-white rounded-2xl border border-stone-300 flex flex-col gap-4 mb-6">
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-1">
        <h3 className="text-zinc-800 text-xl font-medium font-['Inter']">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-neutral-500 text-sm font-['Inter']">
          <img src="/location-pin.svg" alt="location" width={16} height={16} />
          {location}
        </div>
      </div>
      <div
        className={`px-3 py-1 rounded-[10px] text-sm font-['Inter'] ${statusColor}`}
      >
        {status}
      </div>
    </div>

    {/* Details Section */}
    <div className="grid grid-cols-2 gap-4 p-4 bg-stone-100 rounded-[10px]">
      <div className="flex items-center gap-3">
        <img src="/calendar.svg" alt="calendar" width={20} height={20} />
        <div>
          <p className="text-neutral-500 text-sm font-['Inter']">Date & Time</p>
          <p className="text-zinc-800 text-base font-medium font-['Inter']">
            {date}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <img src="/users.svg" alt="guests" width={20} height={20} />
        <div>
          <p className="text-neutral-500 text-sm font-['Inter']">Guest Count</p>
          <p className="text-zinc-800 text-base font-medium font-['Inter']">
            {guests} guests
          </p>
        </div>
      </div>
    </div>

    {/* Financial Info Section */}
    <div className="grid grid-cols-3 gap-4 border-t border-stone-200 pt-4">
      <div>
        <p className="text-neutral-500 text-sm font-['Inter']">Event Type</p>
        <p className="text-zinc-800 text-base font-medium font-['Inter']">
          {type}
        </p>
      </div>
      <div>
        <p className="text-neutral-500 text-sm font-['Inter']">Total Amount</p>
        <p className="text-zinc-800 text-base font-medium font-['Inter']">
          ${total}
        </p>
      </div>
      <div>
        <p className="text-neutral-500 text-sm font-['Inter']">Amount Paid</p>
        <p className="text-green-600 text-base font-medium font-['Inter']">
          ${paid}
        </p>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-3 mt-2">{actions}</div>
  </div>
);

// 3. Main Page Component
const MyReservations = () => {
  return (
    <div className="w-full min-h-screen bg-stone-50 font-['Inter'] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-zinc-800 text-2xl font-bold font-['Tinos']">
            My Reservations
          </h2>
          <span className="text-neutral-500 font-medium">3 reservations</span>
        </div>

        {/* Reservation 1: Confirmed */}
        <ReservationCard
          title="Royal Grand Ballroom"
          location="Riyadh, King Fahd District"
          status="Confirmed"
          statusColor="bg-green-100 text-green-700"
          date="June 15, 2026 • 6:00 PM"
          guests="300"
          type="Wedding"
          total="25,000"
          paid="5,000"
          actions={
            <>
              <button className="px-6 py-2 bg-rose-900 text-white rounded-[10px] font-medium">
                View Details
              </button>
              <button className="px-6 py-2 border border-stone-300 text-zinc-800 rounded-[10px] font-medium">
                Modify Reservation
              </button>
            </>
          }
        />

        {/* Reservation 2: Pending */}
        <ReservationCard
          title="Golden Palm Hall"
          location="Dammam, Beachfront"
          status="Pending"
          statusColor="bg-yellow-100 text-yellow-700"
          date="July 25, 2026 • 7:00 PM"
          guests="200"
          type="Graduation"
          total="20,000"
          paid="0"
          actions={
            <button className="px-6 py-2 border border-red-600 text-red-600 rounded-[10px] font-medium">
              Cancel Reservation
            </button>
          }
        />

        {/* Reservation 3: Completed */}
        <ReservationCard
          title="Elegant Jasmine Hall"
          location="Jeddah, Corniche"
          status="Completed"
          statusColor="bg-blue-100 text-blue-700"
          date="March 15, 2026 • 5:00 PM"
          guests="300"
          type="Wedding"
          total="18,000"
          paid="18,000"
          actions={
            <button className="px-6 py-2 bg-rose-900 text-white rounded-[10px] font-medium">
              Add Review
            </button>
          }
        />
      </div>
    </div>
  );
};

export default MyReservations;
