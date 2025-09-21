import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedRooms from "./FeaturedRooms";
import HotelServices from "./HotelServices";
import StaticForm from "../ExploreRooms/StaticForm";

function GetStarted() {
  const navigate = useNavigate();

  const [selectedRoom, setSelectedRoom] = useState<string>("All");
  const [guests, setGuests] = useState<number>(1);

  const handleSearch = () => {
    navigate("/allRooms", { state: { roomType: selectedRoom, guests } });
  };

  return (
    <>
      <div className="container">
        <div className="relative w-full h-[600px]">
          <img
            src="https://i.pinimg.com/736x/b1/5f/25/b15f257289f1d06d0e4dd4fc332de429.jpg"
            alt="get-started"
            className="w-full h-full object-cover brightness-50"
          />

          <div className="absolute top-[60%] ml-5 z-40">
            <h1 className="text-[var(--color-accent)]/80 text-5xl font-bold">
              Your Comfort Our Priority
            </h1>
            <div className="text-[var(--color-accent)]/80 font-semibold text-xl w-[60%]">
              Experience comfort, luxury, and exceptional hospitality at our
              premium hotel. We create memorable stays for every guest with
              world-class amenities and service.
            </div>
          </div>

          {/* Booking Form */}
          <StaticForm
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            guests={guests}
            setGuests={setGuests}
            onSearch={handleSearch}
          />
        </div>

        {/* Featured Rooms */}
        <div className="text-center mt-20 mb-6 px-4">
          <h1 className="text-2xl font-bold mb-2">Featured Rooms & Suites</h1>
          <p className="text-[var(--color-secondary)] text-base">
            Discover the perfect accommodation for your stay, from comfortable standard rooms to luxurious penthouse suites.
          </p>
        </div>

        <FeaturedRooms />

        {/* Explore More Button */}
        <div className="w-full text-center my-8">
          <button className="view-btn" onClick={() => navigate("/allRooms")}>
            Explore More
          </button>
        </div>

        <HotelServices />
      </div>
    </>
  );
}

export default GetStarted;
