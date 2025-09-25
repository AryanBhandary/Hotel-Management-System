import { useState, useMemo, useRef, useEffect } from "react";
import rooms from "../../constants/roomsData";
import RoomCard from "./RoomCard";
import RoomFilter from "../RoomsFilter/RoomFilter";
import ResponsiveRoomFilter from "../RoomsFilter/ResponsiveRoomFilter";
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
  const [showFilter, setShowFilter] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const { roomType, guests } = searchParams;

  // Filter rooms based on all criteria
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

  // Infinite scroll observer
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

  // Close mobile filter when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilter]);

  return (
    <div className="container flex gap-6 p-6 justify-center max-w-6xl mx-auto">
      {/* Desktop Filter Sidebar */}
      <div className="hidden md:block lg:min-w-[23%]">
        <div className="sticky top-[75px]">
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

      {/* Rooms Column */}
      <div className="flex-1 mx-auto ml-7">
        {/* Mobile Sticky Filter Button */}
        <div className="flex justify-between items-center md:hidden sticky top-[63px] z-20 mb-4 bg-gradient-to-b from-[var(--color-secondary-light)] to-white p-2 rounded-lg">
          <div className="text-[var(--color-secondary)] font-bold text-xl cursor-pointer">All Our Rooms</div>
          <button
            onClick={() => setShowFilter(true)}
            className="w-45% book-btn"
          >
            Show Filters
          </button>
        </div>

        {/* Rooms List */}
        {currentRooms.length > 0 ? (
          currentRooms.map((room: Room) => <RoomCard key={room.id} room={room} />)
        ) : (
          <p className="text-center text-[var(--color-secondary)]">No rooms match your filters.</p>
        )}

        {/* Infinite Scroll Loader */}
        {visibleCount < filteredRooms.length && (
          <div ref={loaderRef} className="h-10 flex justify-center items-center text-[var(--color-secondary)]">
            {isLoading && (
              <div className="animate-spin border-4 border-[var(--color-primary)] border-t-transparent rounded-full w-6 h-6"></div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      <div ref={filterRef}>
        <ResponsiveRoomFilter
          showFilter={showFilter}
          setShowFilter={setShowFilter}
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
  );
};

export default RoomsList;
