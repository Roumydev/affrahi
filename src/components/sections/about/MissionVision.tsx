import React from "react";

const MissionVision = () => {
  return (
    <section className="w-full bg-white py-10 px-[24px]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[32px]">
        {/* Mission Card */}
        <div
          className="flex flex-col gap-6 p-10 lg:p-12"
          style={{
            borderRadius: "24px",
            background: "#FDF6F7",
            border: "1px solid #E8E6E3",
          }}
        >
          <h2 className="font-cormorant text-[#1A1A1A] text-4xl font-bold">
            Our Mission
          </h2>
          <p className="font-montserrat text-[#4A4A4A] text-lg leading-relaxed">
            To simplify the event planning process by providing a curated
            selection of premium venues, transparent information, and seamless
            booking experiences for every celebration.
          </p>
        </div>

        {/* Vision Card */}
        <div
          className="flex flex-col gap-6 p-10 lg:p-12"
          style={{
            borderRadius: "24px",
            background: "#FDF6F7",
            border: "1px solid #E8E6E3",
          }}
        >
          <h2 className="font-cormorant text-[#1A1A1A] text-4xl font-bold">
            Our Vision
          </h2>
          <p className="font-montserrat text-[#4A4A4A] text-lg leading-relaxed">
            To become Algeria's leading platform for event venue discovery,
            setting the standard for luxury, reliability, and innovation in the
            event industry.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
