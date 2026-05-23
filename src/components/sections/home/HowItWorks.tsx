import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Browse & Discover",
      desc: "Explore our curated collection of luxury event halls",
      icon: "/calendar.svg", // تأكدي أن الأسماء مطابقة لما في مجلد public
    },
    {
      title: "Compare & Select",
      desc: "Review details, pricing, and availability",
      icon: "/check.svg",
    },
    {
      title: "Book & Celebrate",
      desc: "Secure your venue and celebrate your special day",
      icon: "/sparkle.svg",
    },
  ];

  return (
    <section
      className="w-full py-20 px-6 md:px-16"
      style={{ background: "#F4F3F1" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-[#1A1A1A] font-cormorant text-3xl md:text-[64px] font-bold text-center mb-10">
          How It Works
        </h2>

        {/* توزيع العناصر الثلاثة في سطر واحد على الكمبيوتر */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 w-full">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* أيقونة دائرية وردية بمقاس 40x40 كما في Figma */}
              <div className="w-14 h-14 bg-[#FAE8EA] rounded-full flex items-center justify-center mb-6">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-10 h-10" // مقاس الأيقونة 40px
                />
              </div>

              {/* عنوان الخطوة */}
              <h3 className="text-[#1A1A1A] font-montserrat text-lg font-bold mb-3">
                {step.title}
              </h3>

              {/* وصف الخطوة باللون #4A4A4A */}
              <p className="text-[#4A4A4A] font-montserrat text-sm md:text-base leading-relaxed max-w-[250px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
