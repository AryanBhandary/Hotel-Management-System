import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedRooms from "../components/FeaturedRooms";
import HotelServices from "../components/HotelServices";

function GetStarted() {
  const navigate = useNavigate();

  // State for custom dropdown
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const roomOptions = ["All", "Single", "Double", "Suite", "Family Suite"];

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
          className="absolute top-[50%] left-[50%] w-[800px] p-6 -translate-x-[50%] -translate-y-[50%] 
            bg-white/70 flex flex-row items-center justify-between gap-4 rounded-xl z-50"
        >
          {/* Check-in */}
          <div className="flex flex-col w-[140px]">
            <label htmlFor="in" className="text-black mb-1">
              Check-in Date:
            </label>
            <input type="date" id="in" className="p-2 rounded bg-gray-50/70" />
          </div>

          {/* Check-out */}
          <div className="flex flex-col w-[140px]">
            <label htmlFor="out" className="text-black mb-1">
              Check-out Date:
            </label>
            <input type="date" id="out" className="p-2 rounded bg-gray-50/70" />
          </div>

          {/* Room Category Dropdown */}
          <div className="flex flex-col relative w-[140px]">
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

          {/* Guests */}
          <div className="flex flex-col w-[140px]">
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

          {/* Book Now Button */}
          <div className="flex flex-col w-[120px]">
            <div className="text-black mb-1 font-bold">All Set?</div>
            <button className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Featured Rooms Section */}
      <div className="text-center mt-10 mb-6 px-4">
        <h1 className="text-2xl font-bold mb-2">
          Featured Rooms & Suites
        </h1>
        <p className="text-gray-500 text-base">
          Discover the perfect accommodation for your stay, from comfortable standard rooms to luxurious penthouse suites.
        </p>
      </div>

      <FeaturedRooms />

      {/* Explore More Button */}
      <div className="w-full text-center my-8">
        <button
          className="px-6 py-2 w-[200px] rounded-lg font-semibold border border-[var(--color-secondary-light)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary-light)] transition cursor-pointer"
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
