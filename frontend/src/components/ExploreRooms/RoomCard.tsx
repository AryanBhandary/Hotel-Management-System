import { useNavigate } from "react-router-dom";
import type { Room } from "../../constants/types";
import { CheckCircle, XCircle } from "lucide-react";

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col md:flex-row w-full bg-white shadow-lg rounded-xl overflow-hidden mb-8 hover:shadow-2xl transition-shadow border border-[var(--color-secondary-light)]">
      <img
        src={room.image}
        alt={room.type}
        className="w-full md:w-1/3 h-64 md:h-auto object-cover"
      />

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">{room.type} Room</h2>
          <p className="text-[var(--color-secondary)] mb-4">{room.description}</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <span className="bg-[var(--color-secondary-light)] px-3 py-1 rounded-full text-[var(--color-secondary)] text-sm">
            Guests: {room.guests}
          </span>
          <span className="bg-[var(--color-secondary-light)] px-3 py-1 rounded-full text-[var(--color-secondary)] text-sm">
            Price: ${room.price}/night
          </span>
          <span className="bg-[var(--color-secondary-light)] px-3 py-1 rounded-full text-[var(--color-secondary)] text-sm flex items-center gap-1">
            Availability: {room.availability ? (
              <CheckCircle className="text-green-500 w-4 h-4" />
            ) : (
              <XCircle className="text-red-500 w-4 h-4" />
            )}
          </span>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-[var(--color-secondary)] mb-1">Amenities:</h3>
          <div className="flex flex-wrap gap-2">
            {room.amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="bg-[var(--color-secondary-light)] text-[var(--color-secondary)] px-2 py-1 rounded text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex justify-end gap-4">
          <button
            className="view-btn"
            onClick={() => navigate(`/rooms/${room.id}`)}
          >
            View Details
          </button>
          <button className="book-btn"
            onClick={() => navigate(`/booking/${room.id}`)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
