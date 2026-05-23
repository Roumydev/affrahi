import React from "react";

const values = [
  {
    title: "Excellence",
    description: "We maintain the highest standards in every venue we feature",
    icon: "/heart.svg", // تأكدي من وجود هذه الأسماء في مجلد public
  },
  {
    title: "Trust",
    description: "Transparent pricing and honest service you can rely on",
    icon: "/shield.svg",
  },
  {
    title: "Innovation",
    description:
      "Continuously improving our platform for better user experience",
    icon: "/icon-experience.svg",
  },
];

const OurValues = () => {
  return (
    <section className="w-full bg-white pt-10 pb-10 px-[24px] flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="font-cormorant text-[#1A1A1A] text-4xl font-bold mb-4">
          Our Values
        </h2>
        <p className="font-montserrat text-[#4A4A4A] text-lg">
          The principles that guide everything we do
        </p>
      </div>

      {/* Values Grid - Gap 48px as per Figma */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[48px]">
        {values.map((value, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-8 transition-all duration-300 hover:shadow-sm"
            style={{
              borderRadius: "16px",
              border: "1px solid #E8E6E3",
              background: "#FDF6F7", // اللون الخلفي الفاتح جداً من Figma
            }}
          >
            {/* Icon Container - 32x32 as per Figma */}
            <div className="mb-6 flex items-center justify-center">
              <img
                src={value.icon}
                alt={value.title}
                className="w-8 h-8 object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(14%) sepia(61%) saturate(3755%) hue-rotate(334deg) brightness(91%) contrast(98%)",
                }}
              />
            </div>

            <h3 className="font-cormorant text-[#1A1A1A] text-2xl font-bold mb-4">
              {value.title}
            </h3>
            <p className="font-montserrat text-[#4A4A4A] text-sm leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurValues;
