"use client";

import React, { useEffect, useState } from "react";
import { Star, MessageSquare, CheckCircle, Users } from "lucide-react";
import axios from "axios";

type ReviewItem = {
  reservationId: string;
  venueName: string;
  venueId: string;
  eventType: string;
  date: string;
  review: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
  } | null;
};

type PublicReview = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { name: string };
  venue: { name: string };
};

export default function ReviewsPage() {
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [publicReviews, setPublicReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ rating: number; comment: string }>(
    { rating: 5, comment: "" },
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"all" | "mine">("all");

  useEffect(() => {
    Promise.all([axios.get("/api/reviews"), axios.get("/api/reviews/public")])
      .then(([myRes, pubRes]) => {
        setItems(myRes.data.items || []);
        setPublicReviews(pubRes.data.reviews || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openForm = (reservationId: string) => {
    setActiveForm(reservationId);
    setFormData({ rating: 5, comment: "" });
    setError("");
  };

  const handleSubmit = async (reservationId: string) => {
    if (!formData.comment.trim()) {
      setError("Please write a comment before submitting.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await axios.post("/api/reviews", {
        reservationId,
        rating: formData.rating,
        comment: formData.comment,
      });
      setItems((prev) =>
        prev.map((item) =>
          item.reservationId === reservationId
            ? { ...item, review: res.data.review }
            : item,
        ),
      );
      // زيد الـ review للقائمة العامة
      const newItem = items.find((i) => i.reservationId === reservationId);
      if (newItem) {
        setPublicReviews((prev) => [
          {
            id: res.data.review.id,
            rating: res.data.review.rating,
            comment: res.data.review.comment,
            createdAt: res.data.review.createdAt,
            user: { name: "You" },
            venue: { name: newItem.venueName },
          },
          ...prev,
        ]);
      }
      setActiveForm(null);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-gray-400">Loading...</p>
      </div>
    );

  return (
    <div className="w-full space-y-8">
      <div className="mb-2">
        <h2 className="text-zinc-800 text-3xl font-bold">Reviews & Ratings</h2>
        <p className="text-neutral-400 text-sm mt-1">
          See what others say and share your experience
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("all")}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            tab === "all"
              ? "bg-[#8B1538] text-white"
              : "bg-white border border-stone-200 text-gray-600 hover:border-[#8B1538]"
          }`}
        >
          All Reviews ({publicReviews.length})
        </button>
        <button
          onClick={() => setTab("mine")}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            tab === "mine"
              ? "bg-[#8B1538] text-white"
              : "bg-white border border-stone-200 text-gray-600 hover:border-[#8B1538]"
          }`}
        >
          My Reservations ({items.length})
        </button>
      </div>

      {/* ===== ALL REVIEWS ===== */}
      {tab === "all" && (
        <div>
          {publicReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[32px] border border-gray-100">
              <div className="p-6 bg-[#F9F1F3] rounded-full mb-6">
                <Users size={36} className="text-[#8B1538]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-400 text-center max-w-xs">
                Be the first to leave a review!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {publicReviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full p-6 bg-white rounded-2xl border border-stone-200 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F9F1F3] rounded-full flex items-center justify-center font-bold text-[#8B1538]">
                        {review.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {review.user.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-GB",
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
                      <span className="text-xs bg-[#F9F1F3] text-[#8B1538] px-3 py-1 rounded-full font-medium">
                        {review.venue.name}
                      </span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={14}
                            className={
                              s <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-stone-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-700 text-sm leading-6">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== MY RESERVATIONS (Add Review) ===== */}
      {tab === "mine" && (
        <div>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[32px] border border-gray-100">
              <div className="p-6 bg-[#F9F1F3] rounded-full mb-6">
                <MessageSquare size={36} className="text-[#8B1538]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No confirmed reservations
              </h3>
              <p className="text-gray-400 text-center max-w-xs">
                After a confirmed reservation you can leave a review here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={item.reservationId}
                  className="w-full p-6 bg-white rounded-2xl border border-stone-200 flex flex-col gap-4 shadow-sm"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-zinc-800 text-xl font-bold">
                        {item.venueName}
                      </h3>
                      <p className="text-neutral-500 text-sm">
                        {item.eventType} •{" "}
                        {new Date(item.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    {!item.review && activeForm !== item.reservationId && (
                      <button
                        onClick={() => openForm(item.reservationId)}
                        className="flex items-center gap-2 px-5 py-2 bg-[#8B1538] text-white text-sm font-semibold rounded-[10px] hover:bg-[#6d102c] transition-all"
                      >
                        <Star size={16} /> Add Review
                      </button>
                    )}
                    {item.review && (
                      <span className="flex items-center gap-1.5 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold">
                        <CheckCircle size={14} /> Reviewed
                      </span>
                    )}
                  </div>

                  {/* Existing review */}
                  {item.review && (
                    <div className="flex flex-col gap-3 pt-2 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={
                                i < item.review!.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-stone-300"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-neutral-400 text-sm">
                          {new Date(item.review.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <p className="text-zinc-700 text-base leading-6">
                        {item.review.comment}
                      </p>
                    </div>
                  )}

                  {/* Add Review Form */}
                  {activeForm === item.reservationId && !item.review && (
                    <div className="pt-4 border-t border-stone-100 flex flex-col gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-2">
                          Your Rating
                        </p>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  rating: star,
                                }))
                              }
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                size={28}
                                className={
                                  star <= formData.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-stone-300 hover:text-amber-300"
                                }
                              />
                            </button>
                          ))}
                          <span className="ml-2 text-sm text-gray-400 self-center">
                            {formData.rating}/5
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-2">
                          Your Comment
                        </p>
                        <textarea
                          rows={4}
                          placeholder="Share your experience with this hall..."
                          value={formData.comment}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              comment: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm text-zinc-800 placeholder-neutral-400 focus:outline-none focus:border-[#8B1538] focus:ring-1 focus:ring-[#8B1538] resize-none transition"
                        />
                      </div>
                      {error && (
                        <p className="text-red-500 text-sm font-medium">
                          {error}
                        </p>
                      )}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleSubmit(item.reservationId)}
                          disabled={submitting}
                          className="flex-1 py-3 bg-[#8B1538] text-white font-bold rounded-xl hover:bg-[#6d102c] transition disabled:opacity-60"
                        >
                          {submitting ? "Submitting..." : "Submit Review"}
                        </button>
                        <button
                          onClick={() => setActiveForm(null)}
                          className="px-6 py-3 border border-stone-200 text-gray-600 font-medium rounded-xl hover:bg-stone-50 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
