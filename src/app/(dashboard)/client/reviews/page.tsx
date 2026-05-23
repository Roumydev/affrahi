import React from "react";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      hallName: "Elegant Jasmine Hall",
      type: "Wedding",
      date: "March 15, 2026",
      reviewDate: "March 18, 2026",
      rating: 5,
      comment:
        "Amazing hall and excellent service, everything was organized and well-arranged. Highly recommend!",
      hasReview: true,
    },
    {
      id: 2,
      hallName: "Golden Palm Hall",
      type: "Graduation",
      date: "February 22, 2026",
      hasReview: false, // هادي اللي فيها زر Add Review
      rating: 0, // إضافة قيمة افتراضية لتفادي أخطاء TypeScript
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* العنوان الرئيسي */}
      <h2 className="text-zinc-800 text-3xl font-medium font-['Inter'] mb-8">
        Reviews & Ratings
      </h2>

      <div className="flex flex-col gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="w-full p-6 bg-white rounded-2xl border border-stone-300 flex flex-col gap-4"
          >
            {/* رأس الكارد: اسم القاعة والزر */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h3 className="text-zinc-800 text-xl font-medium font-['Inter']">
                  {review.hallName}
                </h3>
                <p className="text-neutral-500 text-sm font-normal font-['Inter']">
                  {review.type} • {review.date}
                </p>
              </div>

              {!review.hasReview && (
                <button className="px-6 py-2 bg-[#8B1538] text-white text-base font-medium font-['Inter'] rounded-[10px] hover:bg-[#6d102c] transition-all">
                  Add Review
                </button>
              )}
            </div>

            {/* إذا كان كاين تقييم: نعرضوا النجوم والكتيبة فقط */}
            {review.hasReview && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < (review.rating ?? 0)
                            ? "fill-amber-400 text-amber-400"
                            : "text-stone-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-neutral-500 text-sm font-normal font-['Inter']">
                    ({review.reviewDate})
                  </span>
                </div>

                <p className="text-zinc-800 text-base font-normal font-['Inter'] leading-6">
                  {review.comment}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
