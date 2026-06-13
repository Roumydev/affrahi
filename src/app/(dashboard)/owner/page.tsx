"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import { useLang } from "@/context/LangContext";

type Venue = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  price: number;
  description?: string;
  image?: string;
  phone?: string;
};

type Reservation = {
  id: string;
  date: string;
  status: string;
  guests: number;
  eventType?: string;
  clientPhone?: string;
  client: { name: string; email: string };
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

type Contact = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastMessage?: string;
};

type Message = {
  id: string;
  content: string;
  createdAt: string;
  sender: { id: string; name: string };
  receiver: { id: string; name: string };
};

export default function OwnerDashboard() {
  const { t, isRTL } = useLang();
  const d = t.ownerDash;

  const [tab, setTab] = useState<
    "venues" | "requests" | "add" | "reviews" | "messages"
  >("venues");
  const [venues, setVenues] = useState<Venue[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [ownerReviews, setOwnerReviews] = useState<Review[]>([]);
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
    phone: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [myId, setMyId] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      axios.get("/api/venues/mine"),
      axios.get("/api/reservations"),
      axios.get("/api/owner/reviews"),
      axios.get("/api/auth/me"),
      axios.get("/api/messages/contacts"),
    ]).then(([v, r, rv, me, ct]) => {
      setVenues(v.data.venues);
      setReservations(r.data.reservations);
      setOwnerReviews(rv.data.reviews || []);
      setMyId(me.data.user.id);
      setContacts(ct.data.contacts || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!selected) return;
    axios.get(`/api/messages/${selected.id}`).then((r) => {
      setMessages(r.data.messages || []);
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    });
  }, [selected]);

  const sendMessage = async () => {
    if (!text.trim() || !selected || sending) return;
    setSending(true);
    try {
      const { data } = await axios.post("/api/messages", {
        receiverId: selected.id,
        content: text,
      });
      setMessages((p) => [...p, data.message]);
      setText("");
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    } catch {}
    setSending(false);
  };

  const handleStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/reservations/${id}`, { status });
      setReservations((p) =>
        p.map((r) => (r.id === id ? { ...r, status } : r)),
      );
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm(d.deleteConfirm)) return;
    try {
      await axios.delete(`/api/venues/${id}`);
      setVenues((p) => p.filter((v) => v.id !== id));
    } catch {}
  };

  const handleEdit = (venue: Venue) => {
    setEditingVenue(venue);
    setForm({
      name: venue.name,
      location: venue.location,
      capacity: String(venue.capacity),
      price: String(venue.price),
      description: venue.description || "",
      image: venue.image || "",
      phone: venue.phone || "",
    });
    setImagePreview(venue.image || "");
    setTab("add");
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    try {
      const payload = {
        ...form,
        capacity: Number(form.capacity),
        price: Number(form.price),
      };
      if (editingVenue) {
        await axios.put(`/api/venues/${editingVenue.id}`, payload);
        setVenues((p) =>
          p.map((v) => (v.id === editingVenue.id ? { ...v, ...payload } : v)),
        );
        setSuccess(d.venueUpdated);
        setEditingVenue(null);
      } else {
        const { data } = await axios.post("/api/venues", payload);
        setVenues((p) => [...p, data.venue]);
        setSuccess(d.venueAdded);
      }
      setForm({
        name: "",
        location: "",
        capacity: "",
        price: "",
        description: "",
        image: "",
        phone: "",
      });
      setImagePreview("");
    } catch {}
    setSubmitting(false);
  };

  const pending = reservations.filter((r) => r.status === "pending");
  const avgRating = ownerReviews.length
    ? (
        ownerReviews.reduce((s, r) => s + r.rating, 0) / ownerReviews.length
      ).toFixed(1)
    : null;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-body text-neutral-400">{d.saving}</p>
      </div>
    );

  const formFields = [
    { label: d.venueName, key: "name", type: "text", ph: d.venueNamePh },
    { label: d.location, key: "location", type: "text", ph: d.locationPh },
    { label: d.phone_label, key: "phone", type: "tel", ph: d.phonePh },
    { label: d.capacity, key: "capacity", type: "number", ph: d.capacityPh },
    { label: d.priceDa, key: "price", type: "number", ph: d.pricePh },
  ];

  return (
    <div className="min-h-screen bg-neutral-100" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div
        className="bg-white border-b border-neutral-300 px-4 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        style={{ boxShadow: "0 2px 4px rgba(43,43,43,0.06)" }}
      >
        <div>
          <h1 className="font-heading text-burgundy-700 text-[24px] sm:text-[28px] font-bold">
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

      {/* Stat cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            {
              label: d.myVenues,
              val: venues.length,
              color: "text-burgundy-700",
            },
            {
              label: d.pendingRequests,
              val: pending.length,
              color: "text-warning-700",
            },
            {
              label: d.confirmed,
              val: reservations.filter((r) => r.status === "confirmed").length,
              color: "text-success-700",
            },
            {
              label: d.reviews,
              val: ownerReviews.length,
              color: "text-info-700",
            },
          ].map((c) => (
            <div
              key={c.label}
              className="bg-white rounded-xl border border-neutral-300 p-4 sm:p-5"
              style={{ boxShadow: "0 2px 4px rgba(43,43,43,0.06)" }}
            >
              <p className="font-body text-neutral-500 text-[11px] uppercase tracking-wide mb-1">
                {c.label}
              </p>
              <p className={`font-heading text-[32px] font-bold ${c.color}`}>
                {c.val}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {[
            { key: "venues", label: d.tabVenues(venues.length) },
            { key: "requests", label: d.tabRequests(pending.length) },
            { key: "reviews", label: d.tabReviews(ownerReviews.length) },
            { key: "messages", label: d.tabMessages(contacts.length) },
            { key: "add", label: editingVenue ? d.tabEdit : d.tabAdd },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className={`px-4 py-2.5 rounded-lg font-body font-medium text-[13px] transition-all whitespace-nowrap ${tab === t.key ? "bg-burgundy-700 text-white" : "bg-white border border-neutral-300 text-neutral-600 hover:border-burgundy-700"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ===== MY VENUES ===== */}
        {tab === "venues" && (
          <div className="flex flex-col gap-4 max-w-4xl pb-10">
            {venues.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-neutral-300">
                <p className="font-body text-neutral-500 mb-4">{d.noVenues}</p>
                <button
                  onClick={() => setTab("add")}
                  className="px-6 py-2.5 bg-burgundy-700 text-white rounded-lg font-body font-semibold text-[13px] hover:bg-burgundy-800 transition-colors"
                >
                  {d.addFirst}
                </button>
              </div>
            ) : (
              venues.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl border border-neutral-300 overflow-hidden"
                  style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.07)" }}
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-40 h-40 sm:h-auto bg-neutral-200 flex-shrink-0">
                      {v.image ? (
                        <img
                          src={v.image}
                          alt={v.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-300 text-4xl">
                          🏛️
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <h3 className="font-heading text-neutral-900 text-[20px] font-bold">
                          {v.name}
                        </h3>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(v)}
                            className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg font-body font-medium text-[12px] hover:border-burgundy-700 hover:text-burgundy-700 transition-colors"
                          >
                            {d.edit}
                          </button>
                          <button
                            onClick={() => handleDelete(v.id)}
                            className="px-4 py-2 border border-error-200 text-error-700 rounded-lg font-body font-medium text-[12px] hover:bg-error-50 transition-colors"
                          >
                            {d.delete}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { icon: "/location-pin.svg", val: v.location },
                          {
                            icon: "/people.svg",
                            val: `${v.capacity} ${d.guests}`,
                          },
                          { icon: "/phone.svg", val: v.phone || "—" },
                        ].map(({ icon, val }) => (
                          <div
                            key={icon}
                            className="flex items-center gap-2 text-neutral-600"
                          >
                            <img
                              src={icon}
                              alt=""
                              className="w-4 h-4 opacity-60"
                            />
                            <span className="font-body text-[13px]">{val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between items-center">
                        <div>
                          <p className="font-body text-neutral-400 text-[10px] uppercase tracking-wider">
                            {d.price}
                          </p>
                          <p className="font-body text-burgundy-700 text-[17px] font-bold">
                            {v.price.toLocaleString()} DA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ===== REQUESTS ===== */}
        {tab === "requests" && (
          <div className="flex flex-col gap-5 max-w-4xl pb-10">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="font-heading text-[22px] font-bold text-neutral-900">
                {d.reservationRequests}
              </h2>
              {pending.length > 0 && (
                <span className="bg-warning-50 border border-warning-500 text-warning-700 text-[10px] font-bold font-body px-3 py-1 rounded-full uppercase tracking-wide">
                  {pending.length} {d.pending_badge}
                </span>
              )}
            </div>
            {reservations.length === 0 ? (
              <div
                className="bg-white rounded-2xl p-16 text-center border border-neutral-300"
                style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.06)" }}
              >
                <div className="w-16 h-16 bg-burgundy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="/calendar.svg" alt="" className="w-8 h-8" />
                </div>
                <p className="font-heading text-[18px] font-semibold text-neutral-900 mb-1">
                  {d.noRequests}
                </p>
                <p className="font-body text-neutral-500 text-[13px]">
                  {d.noRequestsDesc}
                </p>
              </div>
            ) : (
              reservations.map((r) => {
                const isPending = r.status === "pending";
                const isConfirmed = r.status === "confirmed";
                const isRejected = r.status === "rejected";
                return (
                  <div
                    key={r.id}
                    className="bg-white rounded-2xl border border-neutral-300 overflow-hidden"
                    style={{ boxShadow: "0 4px 12px rgba(43,43,43,0.08)" }}
                  >
                    <div
                      className={`h-1 w-full ${isPending ? "bg-warning-500" : isConfirmed ? "bg-success-500" : "bg-error-500"}`}
                    />
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-heading text-[20px] font-bold text-neutral-900">
                            {r.venue.name}
                          </p>
                          {r.eventType && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <img
                                src="/sparkle.svg"
                                alt=""
                                className="w-3.5 h-3.5 opacity-60"
                              />
                              <span className="font-body text-[11px] text-neutral-500 uppercase tracking-wider">
                                {r.eventType}
                              </span>
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-[10px] font-bold font-body px-3 py-1.5 rounded-full uppercase tracking-widest border ${isConfirmed ? "bg-success-50 text-success-700 border-success-100" : isRejected ? "bg-error-50 text-error-700 border-error-100" : "bg-warning-50 text-warning-700 border-warning-100"}`}
                        >
                          {r.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {[
                          {
                            icon: "/users.svg",
                            label: d.client,
                            val: r.client.name,
                            sub: r.client.email,
                          },
                          {
                            icon: "/calendar.svg",
                            label: d.eventDate,
                            val: new Date(r.date).toLocaleDateString(
                              isRTL ? "ar-DZ" : "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            ),
                          },
                          {
                            icon: "/people.svg",
                            label: d.guests_label,
                            val: `${r.guests} ${d.guests}`,
                          },
                          ...(r.clientPhone
                            ? [
                                {
                                  icon: "/phone.svg",
                                  label: d.phone,
                                  val: r.clientPhone,
                                },
                              ]
                            : []),
                        ].map(({ icon, label, val, sub }: any) => (
                          <div key={label} className="flex items-start gap-2.5">
                            <div className="w-8 h-8 bg-burgundy-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <img src={icon} alt="" className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-body text-[10px] text-neutral-400 uppercase tracking-wider mb-0.5">
                                {label}
                              </p>
                              <p className="font-body text-[13px] font-semibold text-neutral-900">
                                {val}
                              </p>
                              {sub && (
                                <p className="font-body text-[12px] text-neutral-500">
                                  {sub}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {isPending && (
                        <>
                          <div className="border-t border-neutral-200 mb-4" />
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleStatus(r.id, "confirmed")}
                              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-success-500 hover:bg-success-700 text-white text-[13px] font-semibold font-body rounded-xl transition-colors"
                            >
                              <img
                                src="/check.svg"
                                alt=""
                                className="w-4 h-4 brightness-0 invert"
                              />
                              {d.accept}
                            </button>
                            <button
                              onClick={() => handleStatus(r.id, "rejected")}
                              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-error-50 text-error-700 border border-error-200 hover:border-error-500 text-[13px] font-semibold font-body rounded-xl transition-all"
                            >
                              {d.decline}
                            </button>
                          </div>
                        </>
                      )}
                      {isConfirmed && (
                        <>
                          <div className="border-t border-neutral-200 mb-4" />
                          <div className="flex items-center gap-2 bg-success-50 border border-success-100 rounded-xl px-4 py-3">
                            <img
                              src="/check.svg"
                              alt=""
                              className="w-4 h-4"
                              style={{
                                filter:
                                  "invert(42%) sepia(55%) saturate(400%) hue-rotate(100deg)",
                              }}
                            />
                            <p className="font-body text-[13px] text-success-700 font-medium">
                              {d.reservationConfirmed}
                            </p>
                          </div>
                        </>
                      )}
                      {isRejected && (
                        <>
                          <div className="border-t border-neutral-200 mb-4" />
                          <div className="bg-error-50 border border-error-100 rounded-xl px-4 py-3">
                            <p className="font-body text-[13px] text-error-700 font-medium">
                              {d.requestDeclined}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ===== REVIEWS ===== */}
        {tab === "reviews" && (
          <div className="max-w-4xl pb-10">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading text-neutral-900 text-[22px] font-bold">
                {d.reviews}
              </h2>
              {avgRating && (
                <div className="flex items-center gap-1.5 bg-gold-100 border border-gold-200 px-3 py-1.5 rounded-full">
                  <img src="/star.svg" alt="" className="w-3.5 h-3.5" />
                  <span className="font-body text-[13px] font-bold text-gold-700">
                    {avgRating}
                  </span>
                  <span className="font-body text-[12px] text-neutral-400">
                    ({ownerReviews.length})
                  </span>
                </div>
              )}
            </div>
            {ownerReviews.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-neutral-300">
                <p className="font-body text-neutral-500">{d.noReviews}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {ownerReviews.map((rv) => (
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
                          <p className="font-body text-neutral-400 text-[11px]">
                            {new Date(rv.createdAt).toLocaleDateString(
                              isRTL ? "ar-DZ" : "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
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
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== MESSAGES ===== */}
        {tab === "messages" && (
          <div className="max-w-4xl pb-10">
            <h2 className="font-heading text-neutral-900 text-[22px] font-bold mb-6">
              {d.tabMessages(contacts.length)}
            </h2>
            {contacts.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-neutral-300">
                <p className="font-body text-neutral-500">{d.noMessages}</p>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-4 h-[500px]">
                <div className="w-full lg:w-64 flex-shrink-0 bg-white rounded-2xl border border-neutral-300 overflow-y-auto">
                  {contacts.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelected(c)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-neutral-100 transition-colors ${selected?.id === c.id ? "bg-burgundy-50" : "hover:bg-neutral-50"}`}
                    >
                      <div className="w-9 h-9 bg-burgundy-100 rounded-full flex items-center justify-center font-heading text-burgundy-700 font-bold flex-shrink-0">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-body font-semibold text-neutral-900 text-[13px] truncate">
                          {c.name}
                        </p>
                        <p className="font-body text-neutral-400 text-[11px] truncate">
                          {c.lastMessage || c.email}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex-1 bg-white rounded-2xl border border-neutral-300 flex flex-col overflow-hidden">
                  {!selected ? (
                    <div className="flex-1 flex items-center justify-center text-neutral-400 font-body text-[14px]">
                      {d.selectContact}
                    </div>
                  ) : (
                    <>
                      <div className="px-5 py-4 border-b border-neutral-200 flex items-center gap-3">
                        <div className="w-8 h-8 bg-burgundy-100 rounded-full flex items-center justify-center font-heading text-burgundy-700 font-bold text-[14px]">
                          {selected.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-body font-semibold text-neutral-900 text-[13px]">
                            {selected.name}
                          </p>
                          <p className="font-body text-neutral-400 text-[11px]">
                            {selected.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                        {messages.map((m) => {
                          const isMe = m.sender.id === myId;
                          return (
                            <div
                              key={m.id}
                              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[75%] px-4 py-2.5 rounded-2xl font-body text-[13px] leading-relaxed ${isMe ? "bg-burgundy-700 text-white rounded-br-sm" : "bg-neutral-100 text-neutral-900 rounded-bl-sm"}`}
                              >
                                {m.content}
                              </div>
                            </div>
                          );
                        })}
                        <div ref={bottomRef} />
                      </div>
                      <div className="px-4 py-3 border-t border-neutral-200 flex gap-2">
                        <input
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                          placeholder={d.descriptionPh}
                          className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] transition-colors"
                        />
                        <button
                          onClick={sendMessage}
                          disabled={sending || !text.trim()}
                          className="px-4 py-2.5 bg-burgundy-700 text-white rounded-xl hover:bg-burgundy-800 transition-colors disabled:opacity-40"
                        >
                          <Send size={15} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== ADD / EDIT VENUE ===== */}
        {tab === "add" && (
          <div className="max-w-2xl pb-10">
            <div
              className="bg-white rounded-2xl border border-neutral-300 p-6 sm:p-8"
              style={{ boxShadow: "0 4px 8px rgba(43,43,43,0.07)" }}
            >
              <h2 className="font-heading text-neutral-900 text-[22px] font-bold mb-1">
                {editingVenue ? d.editVenue : d.addVenue}
              </h2>
              <p className="font-body text-neutral-600 text-[13px] mb-6">
                {editingVenue ? d.updateDetails : d.fillDetails}
              </p>
              {success && (
                <div className="mb-5 p-3.5 bg-success-50 border border-success-100 rounded-xl font-body text-success-700 text-[13px]">
                  {success}
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {formFields.map((f) => (
                  <div key={f.key}>
                    <label className="font-body text-[11px] font-bold text-neutral-900 uppercase tracking-[1px] block mb-1.5">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.ph}
                      required
                      value={(form as any)[f.key]}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                      className="w-full p-3 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] text-neutral-900 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-body text-[11px] font-bold text-neutral-900 uppercase tracking-[1px] block mb-1.5">
                    {d.description}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={d.descriptionPh}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full p-3 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] text-neutral-900 resize-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-[11px] font-bold text-neutral-900 uppercase tracking-[1px] block mb-1.5">
                    {d.venuePhoto}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 rounded-lg border border-neutral-300 font-body text-[13px] text-neutral-900 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-burgundy-100 file:text-burgundy-700 file:font-semibold file:text-[12px] cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="mt-3 w-full h-40 rounded-xl overflow-hidden border border-neutral-200">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3.5 bg-burgundy-700 text-white font-body font-bold rounded-lg hover:bg-burgundy-800 transition-colors disabled:opacity-50 text-[14px]"
                  >
                    {submitting
                      ? d.saving
                      : editingVenue
                        ? d.updateVenue
                        : d.addVenue}
                  </button>
                  {editingVenue && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingVenue(null);
                        setForm({
                          name: "",
                          location: "",
                          capacity: "",
                          price: "",
                          description: "",
                          image: "",
                          phone: "",
                        });
                        setImagePreview("");
                        setTab("venues");
                      }}
                      className="px-6 py-3.5 border border-neutral-300 text-neutral-600 font-body font-semibold rounded-lg hover:bg-neutral-50 transition-colors text-[14px]"
                    >
                      {d.cancel}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
