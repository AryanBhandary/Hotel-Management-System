import { useState, useMemo, useRef, useEffect } from "react";
import rooms from "../data/roomsData";
import RoomCard from "./RoomCard";
import RoomFilter from "./RoomFilter";
import type { Room } from "../data/types";

const roomOptions = ["All", "Single", "Double", "Family Suite", "Suite"];

const RoomsList: React.FC = () => {
  const roomsPerPage = 7;

  const [roomType, setRoomType] = useState<string>("All");
  const [guests, setGuests] = useState<number | "">("");
  const [budget, setBudget] = useState<number>(25000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [bedPreferences, setBedPreferences] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(roomsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Custom dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room: Room) => {
      let match = true;
      if (roomType && roomType !== "All" && room.type !== roomType) match = false;
      if (guests && room.guests < Number(guests)) match = false;
      if (!room.availability) match = false;
      if (room.price > budget) match = false;
      if (selectedAmenities.length > 0 && !selectedAmenities.every((a) => room.amenities.includes(a))) match = false;
      if (selectedRoomTypes.length > 0 && !selectedRoomTypes.includes(room.type)) match = false;
      if (bedPreferences.length > 0 && !bedPreferences.includes(room.bedPreference)) match = false;
      return match;
    });
  }, [roomType, guests, budget, selectedAmenities, selectedRoomTypes, bedPreferences]);

  const currentRooms = filteredRooms.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && visibleCount < filteredRooms.length) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + roomsPerPage, filteredRooms.length));
            setIsLoading(false);
          }, 800);
        }
      },
      { threshold: 1.0 }
    );

    const loaderEl = loaderRef.current;
    if (loaderEl) observer.observe(loaderEl);

    return () => {
      if (loaderEl) observer.unobserve(loaderEl);
    };
  }, [filteredRooms.length, isLoading]);

  return (
    <>
      {/* Filters */}
      <div className="absolute top-[45%] left-1/2 w-[90%] max-w-4xl p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl z-50 -translate-x-1/2 -translate-y-1/2 border border-[var(--color-secondary-light)]">
        <div className="flex flex-col w-[18%]">
          <label className="text-[var(--color-secondary)] mb-1">Check-in Date:</label>
          <input type="date" className="p-2 rounded bg-[var(--color-secondary-light)]" />
        </div>
        <div className="flex flex-col w-[18%]">
          <label className="text-[var(--color-secondary)] mb-1">Check-out Date:</label>
          <input type="date" className="p-2 rounded bg-[var(--color-secondary-light)]" />
        </div>

        {/* Custom Room Dropdown */}
        <div className="flex flex-col relative w-[18%]">
          <label className="text-[var(--color-secondary)] mb-1">Room Category:</label>
          <div className="relative w-full">
            <button
              type="button"
              className="w-full p-2 bg-[var(--color-secondary-light)] rounded text-left text-[var(--color-text-light-bg)"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {roomType}
            </button>
            {dropdownOpen && (
              <ul className="absolute w-full bg-[var(--color-bg-light)] border border-[var(--color-secondary-light)] rounded mt-1 max-h-40 overflow-auto shadow-lg z-50">
                {roomOptions.map((option) => (
                  <li
                    key={option}
                    className="p-2 hover:bg-[var(--color-secondary-light)] cursor-pointer transition-colors"
                    onClick={() => {
                      setRoomType(option);
                      setDropdownOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col w-[18%]">
          <label className="text-[var(--color-secondary)] mb-1">Guests:</label>
          <input
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(e) => setGuests(e.target.value ? Number(e.target.value) : "")}
            className="p-2 rounded bg-[var(--color-secondary-light)]"
          />
        </div>
      </div>

      {/* Filters + Room Cards */}
      <div className="flex gap-6 p-6 mt-20 justify-center">
        <div className="w-[15%]">
          <div className="sticky top-[120px]">
            <RoomFilter
              budget={budget}
              setBudget={setBudget}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              selectedRoomTypes={selectedRoomTypes}
              setSelectedRoomTypes={setSelectedRoomTypes}
              bedPreferences={bedPreferences}
              setBedPreferences={setBedPreferences}
            />
          </div>
        </div>

        <div className="w-[60%]">
          {currentRooms.length > 0 ? (
            currentRooms.map((room: Room) => <RoomCard key={room.id} room={room} />)
          ) : (
            <p className="text-[var(--color-secondary)] text-center">No rooms match your filters.</p>
          )}

          {visibleCount < filteredRooms.length && (
            <div ref={loaderRef} className="h-10 flex justify-center items-center text-[var(--color-secondary)]">
              {isLoading && (
                <div className="animate-spin border-4 border-[var(--color-primary)] border-t-transparent rounded-full w-6 h-6"></div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RoomsList;
