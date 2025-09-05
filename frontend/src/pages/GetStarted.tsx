import { useWindowSize } from "../hooks/useWindowSize";
import FeaturedRooms from "../components/FeaturedRooms";
import HotelServices from "../components/HotelServices";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function GetStarted() {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width < 768;

  // State for custom dropdown
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const roomOptions = ["All", "Single", "Double", "Suite", "Family Suite",  ];

  return (
    <>
      {/* Hero Section with Booking Form */}
      <div className="relative w-full h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
          alt="get-started"
          className="w-full h-full object-cover brightness-60"
        />

        <div
          className={`absolute top-1/2 left-1/2 w-[90%] max-w-4xl p-6 -translate-x-1/2 -translate-y-1/2 bg-white/70 flex flex-col 
            ${isMobile ? "gap-4" : "md:flex-row items-center justify-between gap-4"} rounded-xl z-50`}
        >
          <div className="flex flex-col w-[18%]">
            <label htmlFor="in" className="text-black mb-1">
              Check-in Date:
            </label>
            <input type="date" id="in" className="p-2 rounded bg-gray-50/70" />
          </div>

          <div className="flex flex-col w-[18%]">
            <label htmlFor="out" className="text-black mb-1">
              Check-out Date:
            </label>
            <input type="date" id="out" className="p-2 rounded bg-gray-50/70" />
          </div>

          {/* Custom Dropdown */}
          <div className="flex flex-col relative w-[18%]">
            <label className="text-black mb-1">Room Category:</label>
            <div className="relative w-full">
              <button
                type="button"
                className="w-full p-2 bg-[var(--color-bg-light)] rounded text-left text-[var(--color-text-light-bg)]"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedRoom || "Select Room"}
              </button>
              {dropdownOpen && (
                <ul className="absolute w-full bg-white border border-[var(--color-secondary-light)] rounded mt-1 max-h-40 overflow-auto shadow-lg z-50">
                  {roomOptions.map((room) => (
                    <li
                      key={room}
                      className="p-2 hover:bg-[var(--color-secondary-light)] text-[var(--color-text-light-bg)] cursor-pointer"
                      onClick={() => {
                        setSelectedRoom(room);
                        setDropdownOpen(false);
                      }}
                    >
                      {room}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-col w-[18%]">
            <label htmlFor="guest" className="text-black mb-1">
              Guests:
            </label>
            <input
              type="number"
              id="guest"
              min="1"
              max="10"
              className="p-2 rounded bg-gray-50/70"
            />
          </div>

          <div className="flex flex-col">
            <div className="text-black mb-1 font-bold">All Set?</div>
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Featured Rooms Section */}
      <div className="text-center mt-10 mb-6 px-4 md:px-0">
        <h1 className="text-xl md:text-2xl font-bold mb-2">
          Featured Rooms & Suites
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Discover the perfect accommodation for your stay, from comfortable standard rooms to luxurious penthouse suites.
        </p>
      </div>

      <FeaturedRooms />

      {/* Explore More Button */}
      <div className="w-full text-center my-8">
        <button
          className="px-6 py-2 w-[60%] md:w-[20%] rounded-lg font-semibold border border-[var(--color-secondary-light)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary-light)] transition cursor-pointer"
          onClick={() => navigate("/allRooms")}
        >
          Explore More
        </button>
      </div>

      <HotelServices />
    </>
  );
}

export default GetStarted;
