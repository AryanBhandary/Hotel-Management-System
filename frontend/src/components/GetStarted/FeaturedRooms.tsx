import { FaUsers } from "react-icons/fa";
import rooms from "../../constants/roomsData";
import type { Room } from "../../constants/types";
import { useNavigate } from "react-router-dom";

function FeaturedRooms() {
  const navigate = useNavigate();

  const randomRooms: Room[] = [...rooms]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const handleBookNow = (roomId: number) => {
    const token = localStorage.getItem("token");
    if (token) {
      // ✅ User logged in → go to booking
      navigate(`/booking/${roomId}`);
    } else {
      // ❌ User not logged in → go to login
      navigate("/signup");
    }
  };

  return (
    <div className="py-10 px-6 bg-[var(--color-accent)]">
      <div className="flex flex-wrap justify-center gap-6">
        {randomRooms.map((room: Room) => (
          <div
            key={room.id}
            className="w-[350px] bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col border-[var(--color-secondary-light)] border"
          >
            {/* ---------- Room Image ---------- */}
            <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
              <img
                src={room.image}
                alt={room.type}
                className="w-full h-full object-cover transition duration-500 ease-in-out hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[var(--color-primary-hover)] cursor-pointer"
                  onClick={() => navigate(`/rooms/${room.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>

            {/* ---------- Room Info ---------- */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between text-left mb-2">
                <h3 className="text-xl font-semibold">{room.type}</h3>
                <div className="flex items-center gap-1 text-[var(--color-secondary)]">
                  <FaUsers />
                  <span>{room.guests}</span>
                </div>
              </div>

              <p className="text-[var(--color-secondary)] mb-3">
                {room.description}
              </p>

              {/* ---------- Amenities ---------- */}
              <div className="flex flex-wrap gap-2 mb-3">
                {room.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="text-sm bg-[var(--color-secondary-light)] text-[var(--color-secondary)] px-2 py-1 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              {/* ---------- Actions ---------- */}
              <div className="mt-auto">
                <div className="mb-1 flex justify-between">
                  <p className="text-[var(--color-primary)] font-bold pt-2">
                    ${room.price} / night
                  </p>
                </div>
                <div className="mt-auto flex justify-center gap-5">
                  <button
                    className="book-btn"
                    onClick={() => handleBookNow(room.id)}
                  >
                    Book Now
                  </button>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/rooms/${room.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedRooms;
