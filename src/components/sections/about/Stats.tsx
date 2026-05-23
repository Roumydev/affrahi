const stats = [
  { label: "Happy Clients", value: "5,000+", icon: "icon-clients.svg" },
  { label: "Events Hosted", value: "10,000+", icon: "/star.svg" },
  { label: "Years Experience", value: "15+", icon: "/icon-experience.svg" },
  { label: "Partner Venues", value: "50+", icon: "/icon-venues.svg" },
];

const Stats = () => {
  return (
    <section className="w-full bg-white py-10 px-[24px]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-10"
            style={{
              borderRadius: "12px",
              border: "0.667px solid #E8E6E3",
              boxShadow: "0 4px 8px -2px rgba(43, 43, 43, 0.08)",
            }}
          >
            <div className="mb-4">
              <img
                src={stat.icon}
                alt={stat.label}
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-[#8B1A2F] text-4xl font-bold font-cormorant mb-2">
              {stat.value}
            </span>
            <span className="text-[#4A4A4A] text-sm font-montserrat uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
