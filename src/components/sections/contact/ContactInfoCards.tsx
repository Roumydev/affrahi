import React from "react";

const contactDetails = [
  {
    title: "Phone",
    info1: "+213 550 123 456",
    info2: "+213 770 987 654",
    icon: "/phone.svg",
  },
  {
    title: "Email",
    info1: "info@afrahi.dz",
    info2: "support@afrahi.dz",
    icon: "/email.svg",
  },
  {
    title: "Office",
    info1: "123 Didouche Mourad Street",
    info2: "Algiers 16000, Algeria",
    icon: "/location.svg",
  },
  {
    title: "Working Hours",
    info1: "Sunday - Thursday: 9AM - 6PM",
    info2: "Saturday: 10AM - 4PM",
    icon: "/clock.svg",
  },
];

const ContactInfoCards = () => {
  return (
    <section className="w-full bg-white py-10 px-[24px] flex justify-center">
      {/* الحاوية الرئيسية: عمودين في الشاشات المتوسطة والكبيرة لضمان 2 فوق و2 تحت */}
      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {contactDetails.map((item, index) => (
          <div
            key={index}
            // التعديل: py-10 تعطي 40px (زيادة 16px على الـ 24px الأصلية)
            className="flex items-start gap-5 px-6 py-10 transition-all duration-300 hover:shadow-md"
            style={{
              borderRadius: "12px",
              border: "0.667px solid #E8E6E3",
              background: "#FFFFFF",
              boxShadow: "0 4px 8px -2px rgba(43, 43, 43, 0.08)",
            }}
          >
            {/* Icon Container - دائري بلون البراند الخفيف */}
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#FDF6F7] rounded-full">
              <img
                src={item.icon}
                alt={item.title}
                className="w-6 h-6 object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(14%) sepia(61%) saturate(3755%) hue-rotate(334deg) brightness(91%) contrast(98%)",
                }}
              />
            </div>

            {/* Content Container - محاذاة لليسار كما في التصميم */}
            <div className="flex flex-col text-left">
              <h3 className="font-cormorant text-[#1A1A1A] text-xl font-bold mb-1">
                {item.title}
              </h3>
              <div className="font-montserrat text-[#4A4A4A] text-sm leading-relaxed">
                <p className="whitespace-nowrap">{item.info1}</p>
                <p>{item.info2}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfoCards;
