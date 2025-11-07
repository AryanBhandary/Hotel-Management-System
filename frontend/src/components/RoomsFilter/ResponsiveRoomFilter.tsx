import React from "react";
import RoomFilter from "./RoomFilter";


interface Props {
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


const ResponsiveRoomFilter: React.FC<Props> = ({
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
    <>
      {/* Overlay */}
      <div
        onClick={() => setShowFilter(false)}
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          showFilter ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[240px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          showFilter ? "translate-x-0" : `-translate-x-full`
        }`}
        style={{ width: "240px" }}
      >
        <div className="p-5 overflow-y-auto h-full">

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
    </>
  );
};

export default ResponsiveRoomFilter;
