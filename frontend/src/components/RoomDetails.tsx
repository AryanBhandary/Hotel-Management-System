import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import rooms from "../data/roomsData";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find((r) => r.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(room?.gallery[0] || "");

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 mt-[10%]">
        Room not found 😕
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 max-w-5xl mx-auto mt-[5%]">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-white text-[var(--color-secondary)] px-6 py-2 rounded-lg border border-[var(--color-secondary-light)] hover:bg-[var(--color-secondary-light)] transition cursor-pointer mb-3"
      >
        ← Back to Rooms
      </button>

      {/* Main Image */}
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
            className={`w-24 h-20 object-cover rounded-lg cursor-pointer border-2 ${
              selectedImage === img ? "border-blue-500" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
