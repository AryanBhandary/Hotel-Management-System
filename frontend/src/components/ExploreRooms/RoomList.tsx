import { useState, useMemo, useRef, useEffect } from "react";
import rooms from "../../constants/roomsData";
import RoomCard from "./RoomCard";
import RoomFilter from "./RoomFilter";
import type { Room } from "../../constants/types";


type RoomsListProps = {
  searchParams: {
    roomType: string;
    guests: number;
  };
};

const RoomsList: React.FC<RoomsListProps> = ({ searchParams }) => {
  const roomsPerPage = 7;

  const [budget, setBudget] = useState<number>(25000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [bedPreferences, setBedPreferences] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(roomsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { roomType, guests } = searchParams;

  const filteredRooms = useMemo(() => {
    return rooms.filter((room: Room) => {
      let match = true;
      if (roomType && roomType !== "All" && room.type !== roomType) match = false;
      if (guests && room.guests < guests) match = false;
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
    <div className="flex gap-6 p-6 justify-center">
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
  );
};

export default RoomsList;
