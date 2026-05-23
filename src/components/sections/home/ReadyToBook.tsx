import React from "react";

const ReadyToBook = () => {
  return (
    <section
      className="w-full py-20 px-6 text-center text-white"
      style={{
        background: "linear-gradient(135deg, #8B1538 0%, #4F0A21 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="font-cormorant text-3xl md:text-[45px] font-bold mb-6 leading-tight">
          Ready to Book Your Dream Venue?
        </h2>

        <p className="font-montserrat text-base md:text-xl opacity-90 max-w-2xl mb-10">
          Join thousands of satisfied clients who trusted us with their special
          moments
        </p>

        {/* زر Get Started باللون الذهبي #C9A962 */}
        <button className="bg-[#C9A962] hover:bg-[#b39552] text-[#1A1A1A] font-montserrat font-bold py-4 px-12 rounded transition-all duration-300 shadow-xl uppercase tracking-wider text-sm">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default ReadyToBook;
