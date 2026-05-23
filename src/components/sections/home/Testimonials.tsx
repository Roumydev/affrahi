import React from "react";
import TestimonialCard from "../../ui/TestimonialCard";

const Testimonials = () => {
  const reviews = [
    {
      name: "Amina Benali",
      role: "Bride",
      quote:
        "Afrahi made our wedding day perfect! The booking process was seamless and the venue exceeded our expectations.",
    },
    {
      name: "Sofiane Toumi",
      role: "Corporate Event Manager",
      quote:
        "Professional service and stunning venues. Our annual gala was a huge success thanks to Afrahi.",
    },
    {
      name: "Malika Cherif",
      role: "Event Planner",
      quote:
        "The platform is intuitive and the venues are top-notch. Highly recommend for any special occasion!",
    },
  ];

  return (
    // تم تحديث الخلفية للون #F8F7F5
    // الحفاظ على مسافة 80px (py-20)
    <section
      className="w-full py-20 px-6"
      style={{ backgroundColor: "#F8F7F5" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* المسافة تحت العنوان 64px (mb-16) */}
        <h2 className="font-cormorant text-3xl md:text-[40px] font-bold text-center mb-16 text-[#1A1A1A]">
          What Our Clients Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <TestimonialCard
              key={index}
              name={review.name}
              role={review.role}
              quote={review.quote}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
