import React from "react";
import RoomFilter from "./RoomFilter";
import { IoClose } from "react-icons/io5";

interface ResponsiveRoomFilterProps {
  showFilter: boolean;
  setShowFilter: (val: boolean) => void;
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
  selectedAmenities: string[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>;
  selectedRoomTypes: string[];
  setSelectedRoomTypes: React.Dispatch<React.SetStateAction<string[]>>;
  bedPreferences: string[];
  setBedPreferences: React.Dispatch<React.SetStateAction<string[]>>;
}

const ResponsiveRoomFilter: React.FC<ResponsiveRoomFilterProps> = ({
  showFilter,
  setShowFilter,
  budget,
  setBudget,
  selectedAmenities,
  setSelectedAmenities,
  selectedRoomTypes,
  setSelectedRoomTypes,
  bedPreferences,
  setBedPreferences,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-[70%] h-full bg-black/40 z-50 transform transition-transform duration-300 md:hidden
        ${showFilter ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="absolute left-0 top-0 w-full h-full bg-black/40 p-6 shadow-lg overflow-auto">
        <button
          className="mb-4 text-[var(--color-secondary)] font-bold"
          onClick={() => setShowFilter(false)}
        >
          <IoClose size={28} className="text-black bg-white/70 rounded-2xl"/>
        </button>
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
  );
};

export default ResponsiveRoomFilter;
