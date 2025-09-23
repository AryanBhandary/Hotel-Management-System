import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import rooms from "../../constants/roomsData";

export default function Form() {
  const { id } = useParams();
  const room = rooms.find((r) => r.id === Number(id));

  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState(1);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    checkIn: "",
    checkOut: "",
    specialRequest: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingDetails = {
      ...formData,
      guests: selectedGuests,
      room: room?.type,
    };
    console.log("Booking Details:", bookingDetails);
    alert(`Booking for ${room?.type} submitted successfully!`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setGuestDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 mt-[10%]">
        Room not found 😕
      </div>
    );
  }

  return (
    <div className="container p-8 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-[var(--color-primary)]">
        Book {room.type}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block font-medium text-[var(--color-secondary)]">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-[var(--color-secondary)]">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-[var(--color-secondary)]">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Guests */}
        <div className="relative mb-4 text-[17px]" ref={dropdownRef}>
          <label className="text-[var(--color-secondary)] mb-1">Guests:</label>
          <div
            className="w-full p-2 rounded bg-gray-50/70 border border-[var(--color-secondary-light)] cursor-pointer flex justify-between items-center"
            onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
          >
            <span>
              {selectedGuests} {selectedGuests === 1 ? "Guest" : "Guests"}
            </span>
          </div>

          {guestDropdownOpen && (
            <ul className="absolute w-full bg-white rounded mt-1 max-h-50 overflow-auto shadow-lg z-50">
              {[...Array(room.guests).keys()].map((num) => {
                const guestNum = num + 1;
                return (
                  <li
                    key={guestNum}
                    className={`p-2 hover:bg-[var(--color-secondary-light)] text-[var(--color-text-dark-bg)] cursor-pointer ${
                      guestNum === selectedGuests
                        ? "font-semibold bg-gray-200"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedGuests(guestNum);
                      setGuestDropdownOpen(false);
                    }}
                  >
                    {guestNum} {guestNum === 1 ? "Guest" : "Guests"}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-[var(--color-secondary)]">
              Check-In
            </label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
              className="w-full p-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block font-medium text-[var(--color-secondary)]">
              Check-Out
            </label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
              className="w-full p-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block font-medium text-[var(--color-secondary)]">
            Special Requests
          </label>
          <textarea
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
            className="w-full p-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Any additional requests..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button type="submit" className="book-btn">
            Book Now
          </button>
          <button
            type="button"
            className="view-btn"
            onClick={() => alert("Viewing rooms...")}
          >
            View Rooms
          </button>
        </div>
      </form>
    </div>
  );
}
