import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedRooms from "./FeaturedRooms";
import HotelServices from "./HotelServices";

function GetStarted() {
  const navigate = useNavigate();

  // State for custom dropdown
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const roomOptions = ["All", "Single", "Double", "Suite", "Family Suite"];

  return (
    <>
      <div className="relative w-full h-[600px]">
        {/* Background Video */}
        {/* <video
          src={HotelCinematic}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-60"
        /> */}
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
          alt="get-started"
          className="w-full h-full object-cover brightness-50"
        />

        <div className="absolute top-[60%] ml-5 z-50">
          <h1 className="text-[var(--color-accent)]/80 text-5xl font-bold"> Your Comfort Our Priority </h1>
          <div className="text-[var(--color-accent)]/80 font-semibold text-xl w-[60%]">
            Experience comfort, luxury, and exceptional hospitality at our premium hotel. We create memorable stays for every guest with world-class amenities and service.
          </div>
        </div>

        {/* Booking Form */}
        <div
          className="absolute top-[99%] left-[50%] w-[800px] p-6 -translate-x-[50%] -translate-y-[50%] 
            bg-[var(--color-secondary)]/30 backdrop-blur-md flex flex-row items-center justify-between gap-4 rounded-xl z-50"
        >

          {/* Check-in */}
          <div className="flex flex-col w-[140px]">
            <label htmlFor="in" className="text-[var(--color-accent)] mb-1">
              Check-in Date:
            </label>
            <input type="date" id="in" className="p-2 rounded bg-[var(--color-accent)]/70" />
          </div>

          {/* Check-out */}
          <div className="flex flex-col w-[140px]">
            <label htmlFor="out" className="text-[var(--color-accent)] mb-1">
              Check-out Date:
            </label>
            <input type="date" id="out" className="p-2 rounded bg-[var(--color-accent)]/70" />
          </div>

          {/* Room Category Dropdown */}
          <div className="flex flex-col relative w-[140px]">
            <label className="text-[var(--color-accent)] mb-1">Room Category:</label>
            <div className="relative w-full">
              <button
                type="button"
                className="w-full p-2 bg-[var(--color-accent)]/70 rounded text-left text-[var(--color-text-dark-bg)]"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedRoom || "Select Room"}
              </button>
              {dropdownOpen && (
                <ul className="absolute w-full bg-[var(--color-accent)] border border-[var(--color-secondary-light)] rounded mt-1 max-h-60 overflow-auto shadow-lg z-50">
                  {roomOptions.map((room) => (
                    <li
                      key={room}
                      className="p-2 hover:bg-[var(--color-secondary-light)] text-[var(--color-text-dark-bg)] cursor-pointer"
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
            <label htmlFor="guest" className="text-[var(--color-accent)] mb-1">
              Guests:
            </label>
            <input
              type="number"
              id="guest"
              min="1"
              max="10"
              className="p-2 rounded bg-[var(--color-accent)]/70"
            />
          </div>

          {/* Book Now Button */}
          <div className="flex flex-col w-[120px]">
            <div className="text-[var(--color-accent)] mb-1">All Set?</div>
            <button className="bg-red-600 text-[var(--color-accent)] p-2 rounded hover:bg-red-700 transition cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
      </div>


      {/* Featured Rooms Section */}
      <div className="text-center mt-20 mb-6 px-4">
        <h1 className="text-2xl font-bold mb-2">
          Featured Rooms & Suites
        </h1>
        <p className="text-[var(--color-secondary)] text-base">
          Discover the perfect accommodation for your stay, from comfortable standard rooms to luxurious penthouse suites.
        </p>
      </div>

      <FeaturedRooms />

      {/* Explore More Button */}
      <div className="w-full text-center my-8">
        <button
          className="view-btn"
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
