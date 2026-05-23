import React from "react";

const OurStory = () => {
  return (
    // التعديل هنا: غيرنا py-20 لـ pt-20 (فوق) و pb-10 (تحت)
    <section className="pt-20 pb-10 px-[24px] bg-white flex flex-col items-center w-full">
      <div className="w-full flex flex-col items-start gap-12">
        <div className="flex flex-col gap-4 text-left w-full">
          <h2 className="font-cormorant text-[#1A1A1A] text-5xl font-bold">
            Our Story
          </h2>
          <div className="flex flex-col gap-6 text-[#4A4A4A] font-montserrat text-lg leading-relaxed max-w-[800px]">
            <p>
              Afrahi was founded with a simple mission: to make finding and
              booking the perfect luxury event hall effortless.
            </p>
            <p>
              We understand that your special moments deserve exceptional
              venues, and we're here to connect you with Algeria's finest event
              spaces.
            </p>
          </div>
        </div>

        <div
          className="w-full h-[408px] rounded-[24px] overflow-hidden"
          style={{
            backgroundImage: 'url("/our-story-palace.png")',
            backgroundPosition: "50%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundColor: "lightgray",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10)",
          }}
        ></div>
      </div>
    </section>
  );
};

export default OurStory;
