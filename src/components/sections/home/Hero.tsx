import React from "react";
import Button from "@/components/ui/Button";

const Hero = () => {
  return (
    <section
      className="relative w-full h-[500px] flex flex-col items-center justify-center text-center px-[20px]"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(139, 21, 56, 0.40) 0%, rgba(107, 15, 44, 0.50) 100%), url('/hero-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* هنا المشكل: لازم max-w-5xl باش الكتيبة ما تتقسمش بزاف */}
      <div className="max-w-5xl z-10 w-full flex flex-col items-center">
        {/* العناوين: استعملي leading-tight باش الأسطر ما يكونوش بعاد بزاف */}
        <h1 className="text-white font-cormorant text-[45px] md:text-[68px] font-bold leading-[1.1] mb-6 drop-shadow-lg">
          Celebrate Life's Most <br className="hidden md:block" /> Precious
          Moments
        </h1>

        {/* الفقرة: زدنا الـ max-w-3xl باش تخرج كاملة في سطرين برك */}
        <p className="text-white font-montserrat text-[16px] md:text-[18px] mb-10 max-w-3xl opacity-90 leading-relaxed drop-shadow-md">
          Discover and book Algeria's finest luxury event halls for weddings,{" "}
          <br className="hidden md:block" /> celebrations, and unforgettable
          occasions.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <Button variant="primary">Explore Halls</Button>
          <Button variant="outline">List Your Venue</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
