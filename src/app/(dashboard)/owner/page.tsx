"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Venue = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  price: number;
  description?: string;
  image?: string;
};

type Reservation = {
  id: string;
  date: string;
  status: string;
  guests: number;
  eventType?: string;
  client: { name: string; email: string };
  venue: { name: string };
};

export default function OwnerDashboard() {
  const [tab, setTab] = useState<"venues" | "requests" | "add">("venues");
  const [venues, setVenues] = useState<Venue[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [form, setForm] = useState({
    name: "",
    location: "",
    capacity: "",
    price: "",
    description: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    Promise.all([
      axios.get("/api/venues/mine"),
      axios.get("/api/reservations"),
    ]).then(([v, r]) => {
      setVenues(v.data.venues);
      setReservations(r.data.reservations);
      setLoading(false);
    });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm((f) => ({ ...f, image: base64 }));
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const openEdit = (v: Venue) => {
    setEditingVenue(v);
    setForm({
      name: v.name,
      location: v.location,
      capacity: String(v.capacity),
      price: String(v.price),
      description: v.description || "",
      image: v.image || "",
    });
    setImagePreview(v.image || "");
    setTab("add");
  };

  const resetForm = () => {
    setEditingVenue(null);
    setForm({
      name: "",
      location: "",
      capacity: "",
      price: "",
      description: "",
      image: "",
    });
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = {
        name: form.name,
        location: form.location,
        capacity: Number(form.capacity),
        price: Number(form.price),
        description: form.description,
        image: form.image,
      };

      if (editingVenue) {
        const res = await axios.patch(`/api/venues/${editingVenue.id}`, data);
        setVenues((prev) =>
          prev.map((v) => (v.id === editingVenue.id ? res.data.venue : v)),
        );
        setSuccess("Venue updated successfully!");
      } else {
        const res = await axios.post("/api/venues", data);
        setVenues((prev) => [res.data.venue, ...prev]);
        setSuccess("Venue added successfully!");
      }

      resetForm();
      setTab("venues");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this venue?")) return;
    try {
      await axios.delete(`/api/venues/${id}`);
      setVenues((prev) => prev.filter((v) => v.id !== id));
      setTab("venues");
      setSuccess("Venue deleted.");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error deleting venue");
    }
  };

  const handleStatus = async (id: string, status: "confirmed" | "rejected") => {
    await axios.patch(`/api/reservations/${id}`, { status });
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
  };

  const pending = reservations.filter((r) => r.status === "pending");

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E6E3] px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#8B1538] font-cormorant">
            Owner Dashboard
          </h1>
          <p className="text-[#4A4A4A] text-sm font-montserrat mt-1">
            Manage your venue and reservations
          </p>
        </div>
        <button
          onClick={() =>
            axios
              .post("/api/auth/logout")
              .then(() => (window.location.href = "/"))
          }
          className="text-sm text-[#4A4A4A] hover:text-[#8B1538] transition font-montserrat"
        >
          Logout →
        </button>
      </div>

      {/* Stats */}
      <div className="px-8 py-6 grid grid-cols-3 gap-4 max-w-3xl">
        {[
          { label: "My Venue", value: venues.length, color: "text-[#8B1538]" },
          {
            label: "Pending Requests",
            value: pending.length,
            color: "text-yellow-600",
          },
          {
            label: "Confirmed",
            value: reservations.filter((r) => r.status === "confirmed").length,
            color: "text-green-600",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl p-5 border border-[#E8E6E3]"
            style={{ boxShadow: "0 4px 8px -2px rgba(43,43,43,0.08)" }}
          >
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-[#4A4A4A] font-montserrat mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-8">
        <div className="flex gap-2 mb-6">
          {[
            { key: "venues", label: `My Venue (${venues.length})` },
            { key: "requests", label: `Requests (${pending.length} pending)` },
            ...(venues.length === 0 || editingVenue
              ? [
                  {
                    key: "add",
                    label: editingVenue ? "✏️ Edit Venue" : "+ Add Venue",
                  },
                ]
              : []),
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key as any);
                if (t.key !== "add") {
                  resetForm();
                  setSuccess("");
                }
              }}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm font-montserrat transition-all ${
                tab === t.key
                  ? "bg-[#8B1538] text-white"
                  : "bg-white text-[#4A4A4A] border border-[#E8E6E3] hover:border-[#8B1538]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ===== MY VENUE ===== */}
        {tab === "venues" && (
          <div>
            {success && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200 font-montserrat">
                ✓ {success}
              </div>
            )}
            {venues.length === 0 ? (
              <div className="bg-white rounded-xl p-16 text-center border border-[#E8E6E3]">
                <p className="text-[#4A4A4A] text-lg mb-4 font-montserrat">
                  No venue yet
                </p>
                <button
                  onClick={() => setTab("add")}
                  className="px-6 py-2.5 bg-[#8B1538] text-white rounded-lg text-sm font-bold hover:bg-[#6d102c] transition font-montserrat"
                >
                  Add Your Venue
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[876px]">
                {venues.map((v) => (
                  <div
                    key={v.id}
                    className="bg-white rounded-xl overflow-hidden flex flex-col border border-[#E8E6E3]"
                    style={{ boxShadow: "0 4px 8px -2px rgba(43,43,43,0.08)" }}
                  >
                    <div className="h-64 overflow-hidden bg-gray-100">
                      {v.image ? (
                        <img
                          src={v.image}
                          alt={v.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">
                          🏛️
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                      <div>
                        <h3 className="text-[#1A1A1A] text-2xl font-semibold font-cormorant">
                          {v.name}
                        </h3>
                        <div className="flex items-center text-[#4A4A4A] mt-2 gap-2">
                          <img
                            src="/location-pin.svg"
                            className="w-4 h-4"
                            alt="location"
                          />
                          <span className="text-sm font-montserrat">
                            {v.location}
                          </span>
                        </div>
                        <div className="flex items-center text-[#4A4A4A] mt-1 gap-2">
                          <img
                            src="/people.svg"
                            className="w-4 h-4"
                            alt="capacity"
                          />
                          <span className="text-sm font-montserrat">
                            {v.capacity} guests
                          </span>
                        </div>
                        {v.description && (
                          <p className="text-sm text-[#6F6D67] font-montserrat mt-2 line-clamp-2">
                            {v.description}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div>
                          <p className="text-[#6F6D67] text-xs font-montserrat">
                            per event
                          </p>
                          <p className="text-[#8B1538] text-xl font-bold font-montserrat">
                            {v.price.toLocaleString()} DA
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(v)}
                            className="px-4 py-2 border border-[#8B1538] text-[#8B1538] rounded-lg text-sm font-medium hover:bg-[#8B1538] hover:text-white transition font-montserrat"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(v.id)}
                            className="px-4 py-2 border border-red-400 text-red-500 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition font-montserrat"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== REQUESTS ===== */}
        {tab === "requests" && (
          <div className="flex flex-col gap-4 max-w-4xl">
            {reservations.length === 0 ? (
              <div className="bg-white rounded-xl p-16 text-center border border-[#E8E6E3]">
                <p className="text-[#4A4A4A] font-montserrat">
                  No reservation requests yet
                </p>
              </div>
            ) : (
              reservations.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-xl border border-[#E8E6E3] p-6 flex justify-between items-center"
                  style={{ boxShadow: "0 4px 8px -2px rgba(43,43,43,0.08)" }}
                >
                  <div>
                    <p className="font-bold text-[#1A1A1A] text-lg font-cormorant">
                      {r.venue.name}
                    </p>
                    <p className="text-sm text-[#4A4A4A] font-montserrat mt-1">
                      👤 {r.client.name} · {r.client.email}
                    </p>
                    <p className="text-sm text-[#4A4A4A] font-montserrat">
                      📅 {new Date(r.date).toLocaleDateString("en-GB")} · 👥{" "}
                      {r.guests} guests
                    </p>
                    {r.eventType && (
                      <p className="text-sm text-[#4A4A4A] font-montserrat">
                        🎉 {r.eventType}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full font-montserrat ${
                        r.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : r.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {r.status.toUpperCase()}
                    </span>
                    {r.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatus(r.id, "confirmed")}
                          className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition font-montserrat"
                        >
                          ✓ Accept
                        </button>
                        <button
                          onClick={() => handleStatus(r.id, "rejected")}
                          className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition font-montserrat"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ===== ADD / EDIT VENUE ===== */}
        {tab === "add" && (
          <div className="max-w-2xl pb-10">
            <div
              className="bg-white rounded-xl border border-[#E8E6E3] p-8"
              style={{ boxShadow: "0 4px 8px -2px rgba(43,43,43,0.08)" }}
            >
              <h2 className="text-xl font-bold text-[#1A1A1A] font-cormorant mb-6">
                {editingVenue ? "Edit Venue" : "Add Your Venue"}
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Image Upload */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[1px] font-montserrat">
                    Venue Image
                  </label>
                  <div className="border-2 border-dashed border-[#E8E6E3] rounded-xl p-6 text-center hover:border-[#8B1538] transition cursor-pointer relative">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setForm((f) => ({ ...f, image: "" }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-4xl mb-2">📷</p>
                        <p className="text-sm text-[#4A4A4A] font-montserrat">
                          Click to upload image
                        </p>
                        <p className="text-xs text-gray-300 mt-1">
                          JPG, PNG up to 5MB
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[1px] font-montserrat">
                      Venue Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Grand Ballroom"
                      className="p-3 rounded-lg border border-[#E8E6E3] focus:border-[#8B1538] outline-none text-sm font-montserrat"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[1px] font-montserrat">
                      Location *
                    </label>
                    <input
                      required
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                      placeholder="Algiers, Algeria"
                      className="p-3 rounded-lg border border-[#E8E6E3] focus:border-[#8B1538] outline-none text-sm font-montserrat"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[1px] font-montserrat">
                      Capacity (guests) *
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={form.capacity}
                      onChange={(e) =>
                        setForm({ ...form, capacity: e.target.value })
                      }
                      placeholder="500"
                      className="p-3 rounded-lg border border-[#E8E6E3] focus:border-[#8B1538] outline-none text-sm font-montserrat"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[1px] font-montserrat">
                      Price (DA/day) *
                    </label>
                    <input
                      required
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      placeholder="50000"
                      className="p-3 rounded-lg border border-[#E8E6E3] focus:border-[#8B1538] outline-none text-sm font-montserrat"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[1px] font-montserrat">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Describe your venue..."
                    rows={4}
                    className="p-3 rounded-lg border border-[#E8E6E3] focus:border-[#8B1538] outline-none text-sm font-montserrat resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  {editingVenue && (
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setTab("venues");
                      }}
                      className="flex-1 py-3 border border-[#E8E6E3] text-[#4A4A4A] font-bold rounded-lg hover:border-[#8B1538] transition text-sm font-montserrat"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 bg-[#8B1538] text-white font-bold rounded-lg hover:bg-[#6d102c] transition disabled:opacity-50 text-sm font-montserrat"
                  >
                    {submitting
                      ? "Saving..."
                      : editingVenue
                        ? "Save Changes"
                        : "Add Venue"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
