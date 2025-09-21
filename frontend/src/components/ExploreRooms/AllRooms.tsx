import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RoomsList from "./RoomList";
import StaticForm from "../ExploreRooms/StaticForm";

function AllRooms() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedRoom, setSelectedRoom] = useState<string>("All");
  const [guests, setGuests] = useState<number>(1);

  // Initialize state from location.state only once
  useEffect(() => {
    const { roomType, guests: locationGuests } = location.state || {};
    if (roomType) setSelectedRoom(roomType);
    if (locationGuests) setGuests(locationGuests);
  }, [location.state]);

  const handleSearch = () => {
    // Navigate while passing the new search params
    navigate("/allRooms", { state: { roomType: selectedRoom, guests } });
  };

  return (
    <>
      <div className="container">
        <div className="relative w-full h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
            alt="get-started"
            className="w-full h-full object-cover brightness-50"
          />

          <div className="absolute top-[60%] ml-5 z-50">
            <h1 className="text-[var(--color-accent)]/80 text-5xl font-bold">
              Your Comfort Our Priority
            </h1>
            <div className="text-[var(--color-accent)]/80 font-semibold text-xl w-[60%]">
              Experience comfort, luxury, and exceptional hospitality at our premium hotel. We create memorable stays for every guest with world-class amenities and service.
            </div>
          </div>

          <StaticForm
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            guests={guests}
            setGuests={setGuests}
            onSearch={handleSearch}
          />
        </div>

        <div>
          <div className="text-center mt-20 mb-6 px-4">
            <h1 className="text-2xl font-bold mb-2">Featured Rooms & Suites</h1>
            <p className="text-[var(--color-secondary)] text-base">
              Discover the perfect accommodation for your stay, from comfortable standard rooms to luxurious penthouse suites.
            </p>
          </div>
          <RoomsList searchParams={{ roomType: selectedRoom, guests }} />
        </div>
      </div>
    </>
  );
}

export default AllRooms;
