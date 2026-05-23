import React from "react";

const venues = [
  {
    name: "Qasr El Djazair",
    location: "Hydra, Alger",
    image: "/venues/qasr-el-djazair.png",
    capacity: "500 guests",
    price: "750,000 DZD",
  },
  {
    name: "Riadh El Andalous",
    location: "Oran Centre",
    image: "/venues/riadh-el andalous.png",
    capacity: "300 guests",
    price: "450,000 DZD",
  },
  {
    name: "Dar El Bahia",
    location: "Constantine",
    image: "/venues/dar-el-bahia.png",
    capacity: "200 guests",
    price: "320,000 DZD",
  },
  {
    name: "Qasr El Maram",
    location: "Bab Ezzouar, Alger",
    image: "/venues/qasr-el-maram.png",
    capacity: "400 guests",
    price: "580,000 DZD",
  },
  {
    name: "Riadh El Yasmine",
    location: "Sétif",
    image: "/venues/riadh-el-yasmine.png",
    capacity: "250 guests",
    price: "380,000 DZD",
  },
];

const FeaturedVenues = () => {
  return (
    <section className="bg-[#F8F7F5] px-6 py-20 flex flex-col items-center">
      <h2 className="text-[#1A1A1A] text-4xl font-semibold font-cormorant mb-12">
        Featured Luxury Venues
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px] max-w-[876px]">
        {venues.map((venue, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#E8E6E3] flex flex-col"
          >
            <img
              src={venue.image}
              alt={venue.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-6 flex flex-col gap-4">
              <div>
                <h3 className="text-[#1A1A1A] text-2xl font-semibold font-cormorant">
                  {venue.name}
                </h3>

                <div className="flex items-center text-[#4A4A4A] mt-2 gap-2">
                  <img
                    src="/location-pin.svg"
                    className="w-4 h-4"
                    alt="location"
                  />
                  <span className="text-sm font-montserrat">
                    {venue.location}
                  </span>
                </div>

                <div className="flex items-center text-[#4A4A4A] mt-1 gap-2">
                  <img src="/people.svg" className="w-4 h-4" alt="capacity" />
                  <span className="text-sm font-montserrat">
                    {venue.capacity}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end mt-4">
                <div>
                  <p className="text-[#6F6D67] text-xs font-montserrat">
                    per event
                  </p>
                  <p className="text-[#8B1538] text-xl font-bold font-montserrat">
                    {venue.price}
                  </p>
                </div>
                <button className="bg-[#8B1538] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#6b102b] transition-colors font-montserrat">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedVenues;
