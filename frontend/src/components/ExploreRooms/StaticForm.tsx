import React from "react";

type StaticFormProps = {
  selectedRoom: string;
  setSelectedRoom: (room: string) => void;
  guests: number;
  setGuests: (n: number) => void;
  onSearch: () => void;
};

const roomOptions = ["All", "Single", "Double", "Suite", "Family Suite"];

function StaticForm({ selectedRoom, setSelectedRoom, guests, setGuests, onSearch }: StaticFormProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <div
      className="absolute top-[99%] left-[50%] w-[800px] p-6 -translate-x-[50%] -translate-y-[50%] 
      bg-[var(--color-secondary)]/30 backdrop-blur-md flex flex-row items-center justify-between gap-4 rounded-xl z-40"
    >
      {/* Check-in */}
      <div className="flex flex-col w-[140px]">
        <label htmlFor="in" className="text-[var(--color-accent)] mb-1">Check-in Date:</label>
        <input type="date" id="in" className="p-2 rounded bg-[var(--color-accent)]/70" />
      </div>

      {/* Check-out */}
      <div className="flex flex-col w-[140px]">
        <label htmlFor="out" className="text-[var(--color-accent)] mb-1">Check-out Date:</label>
        <input type="date" id="out" className="p-2 rounded bg-[var(--color-accent)]/70" />
      </div>

      {/* Room Category */}
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
                  className="p-2 hover:bg-[var(--color-secondary-light)] cursor-pointer"
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
        <label htmlFor="guest" className="text-[var(--color-accent)] mb-1">Guests:</label>
        <input
          type="number"
          id="guest"
          min={1}
          max={10}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="p-2 rounded bg-[var(--color-accent)]/70"
        />
      </div>

      {/* Search Button */}
      <div className="flex flex-col w-[120px]">
        <div className="text-[var(--color-accent)] mb-1">All Set?</div>
        <button
          className="bg-red-600 text-[var(--color-accent)] p-2 rounded hover:bg-red-700 transition cursor-pointer"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default StaticForm;
