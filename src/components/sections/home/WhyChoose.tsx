import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Curated Selection",
      desc: "Handpicked luxury venues that meet our highest standards for elegance and service",
      icon: "/star.svg",
    },
    {
      title: "Instant Booking",
      desc: "Book your perfect venue instantly with our streamlined reservation system",
      icon: "/calendar.svg",
    },
    {
      title: "Transparent Pricing",
      desc: "Clear, upfront pricing with no hidden fees or surprises",
      icon: "/check.svg",
    },
    {
      title: "Expert Support",
      desc: "24/7 dedicated support to help you plan the perfect celebration",
      icon: "/sparkle.svg",
    },
  ];

  return (
    // 1. py-12 بدلاً من py-20 لنقص الطول الإجمالي للقسم
    <section
      className="w-full py-12 px-6 md:px-16"
      style={{ background: "#F4F3F1" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* 2. mb-10 لنقص المسافة بين العنوان والميزات */}
        <h2 className="text-[#1A1A1A] font-cormorant text-3xl md:text-[40px] font-bold text-center mb-10">
          Why Choose Afrahi
        </h2>

        {/* 3. gap-y-10 لنقص المسافة العمودية بين البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 w-full">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* 4. الدائرة الوردية #FAE8EA مع mb-4 لنقص الطول الداخلي */}
              <div className="w-12 h-12 bg-[#FAE8EA] rounded-full flex items-center justify-center mb-4">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-8 h-8" // حجم 32px حسب فيغما
                />
              </div>

              {/* 5. العنوان الصغير بـ mb-2 لتقريب الوصف */}
              <h3 className="text-[#1A1A1A] font-montserrat text-lg font-bold mb-2">
                {item.title}
              </h3>

              {/* 6. الوصف بـ max-w-xs لضمان التوسيط الجمالي */}
              <p className="text-[#4A4A4A] font-montserrat text-sm leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
