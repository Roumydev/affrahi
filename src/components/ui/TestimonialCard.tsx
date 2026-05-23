import React from "react";
// إذا كنتِ تستخدمين Lucide React (مكتبة أيقونات مشهورة وسهلة)
import { Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
}

const TestimonialCard = ({ quote, name, role }: TestimonialProps) => {
  return (
    <div className="bg-white p-8 rounded-lg border border-[#E5E5E5] shadow-sm flex flex-col items-start text-left h-full">
      {/* نجوم صفراء ذهبية */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            fill="#C9A962" // لون ذهبي يتماشى مع براند Afrahi
            color="#C9A962"
            className="mr-1"
          />
        ))}
      </div>

      <p className="font-montserrat text-[#4A4A4A] text-sm md:text-base leading-relaxed mb-6 italic">
        "{quote}"
      </p>

      <div className="mt-auto">
        <h4 className="font-montserrat font-bold text-[#1A1A1A] text-sm">
          {name}
        </h4>
        <p className="font-montserrat text-[#8B1538] text-xs mt-1">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
