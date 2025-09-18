import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import rooms from "../../constants/roomsData";
import { FaBed, FaBuilding, FaClipboardList, FaConciergeBell, FaGem, FaHotel, FaStar, FaUsers } from "react-icons/fa";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find((r) => r.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(room?.gallery[0] || "");
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState(1);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 mt-[10%]">
        Room not found 😕
      </div>
    );
  }

  return (
    <div className=" mt-[5%]">
      <div className="min-h-screen bg-white p-6 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-white text-[var(--color-secondary)] px-6 py-2 rounded-lg border border-[var(--color-secondary-light)] hover:bg-[var(--color-secondary-light)] transition cursor-pointer mb-3"
        >
          ← Back
        </button>

        {/* Main Image */}
        <div className="flex flex-col md:flex-row gap-2 w-full h-full mb-4">
          <div className="w-[67%]">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected Room"
                className="w-full h-[450px] object-cover rounded-2xl shadow-md"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {room.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-20 object-cover rounded-2xl cursor-pointer border-2 ${selectedImage === img ? "border-[var(--color-bg-dark)]" : "border-transparent"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Room Details */}
          <div className="w-[33%] border border-[var(--color-secondary-light)] rounded-2xl p-4">
            <h1 className="text-2xl font-bold mb-2 ">{room.type} Room</h1>

            <div className="flex gap-4">
              <div className="text-[var(--color-secondary)] flex items-center gap-2 mb-4">
                <div className="text-[15px]"><FaUsers /></div>
                <div className="text-[12px]">Up to {room.guests} Guests</div>
              </div>

              <div className="text-[var(--color-secondary)] flex items-center gap-2 mb-4">
                <div className="text-[15px]"><FaBuilding /></div>
                <div className="text-[12px]"> Floor {room.floor}</div>
              </div>

              <div className="text-[var(--color-secondary)] flex items-center gap-2 mb-4">
                <div className="text-[15px]"><FaBed /></div>
                <div className="text-[12px]"> {room.bedPreference} Bed</div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <div className="text-[var(--color-secondary)] flex items-center gap-2 mb-4">
                <div className="text-[19px] text-yellow-300"><FaStar /></div>
                <div className="text-[17px] font-bold"> {room.rating}</div>
                <div className="text-[var(--color-secondary)]">
                  ({room.reviewsCount} reviews)
                </div>
              </div>
            </div>

            <hr className="text-[var(--color-secondary-light)]" />

            {/* Price */}
            <div>
              <h1 className="text-[17px] font-[700]">Rs. {room.price}</h1>
              <p className="text-[var(--color-secondary)] text-sm mb-4">per night</p>
            </div>

            {/* Dates */}
            <div className="flex gap-4 mb-3">
              {/* Check-in */}
              <div className="flex flex-col w-[140px]">
                <label htmlFor="in" className="text-[var(--color-secondary)] mb-1">
                  Check-in Date:
                </label>
                <input type="date" id="in" className="p-2 rounded bg-[var(--color-bg-light)]" />
              </div>

              {/* Check-out */}
              <div className="flex flex-col w-[140px]">
                <label htmlFor="out" className="text-[var(--color-secondary)] mb-1">
                  Check-out Date:
                </label>
                <input type="date" id="out" className="p-2 rounded bg-[var(--color-bg-light)]" />
              </div>
            </div>

            {/* Guests Dropdown */}
            <div className="relative mb-4 text-[17px]">
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
                        className={`p-2 hover:bg-[var(--color-secondary-light)] text-[var(--color-text-dark-bg)] cursor-pointer ${guestNum === selectedGuests ? "font-semibold bg-gray-200" : ""
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

            <div className="mb-4">
              <h1 className="text-[17px] font-[700]">Room Details</h1>
              <div className="text-[var(--color-secondary)] text-s flex justify-between">
                <div>Parking Facility:</div>
                <div>{room.parking}</div>
              </div>
              <div className="text-[var(--color-secondary)] text-s flex justify-between">
                <div>Room size:</div>
                <div>{room.size}</div>
              </div>
              <div className="text-[var(--color-secondary)] text-s flex justify-between">
                <div>Smoking Policy</div>
                <div>{room.smokingPolicy}</div>
              </div>
            </div>

            <div>
              <button className="bg-[var(--color-primary)] w-full text-white p-2 rounded-lg hover:bg-[var(--color-primary-hover)] transition cursor-pointer">Book Now </button>
            </div>

          </div>
        </div>

        {/* Amenities Section */}
        <div className="flex justify-center max-w-6xl mx-auto gap-2 text-left">
          <div className="w-[53%] border border-[var(--color-secondary-light)] rounded-2xl p-4">

            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div><FaClipboardList /></div>
                <div className="text-[17px] font-[700]">Room Description</div>
              </div>
              <div className="text-[var(--color-secondary)] text-s">{room.description}</div>
            </div>


            <div>
              <div className="flex items-center gap-2">
                <div><FaConciergeBell /></div>
                <div className="text-[17px] font-[700]">Room Service</div>
              </div>
              <div className="text-[var(--color-secondary)] text-s">{room.roomService}</div>
            </div>
          </div>
          <div className="w-[53%] border border-[var(--color-secondary-light)] rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <div><FaGem /></div>
              <div className="text-[17px] font-[700]">Special Features</div>
            </div>
            {room.specialFeatures.map((Feature, id) => (
              <span
                key={id}
                className="text-[var(--color-secondary)] text-s"
              >
                {Feature} <br />
              </span>
            ))}
          </div>
          <div className="w-[53%] border border-[var(--color-secondary-light)] rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <div><FaHotel /></div>
              <div className="text-[17px] font-[700]">Amenities</div>
            </div>
            {room.amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="text-[var(--color-secondary)] text-s"
              >
                {amenity} <br />
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
