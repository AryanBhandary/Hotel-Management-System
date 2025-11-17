import { useState } from "react";
import type { Room } from "../../constants/types";

interface Props {
  room: Room;
}

export default function Gallery({ room }: Props) {
  const [selectedImage, setSelectedImage] = useState(room.gallery[0] || "");

  return (
    <div className="lg:w-[67%] min-w-[55%]">
      <div className="relative">
        <img
          src={selectedImage}
          alt="Selected Room"
          className="w-full h-[450px] object-cover rounded-2xl shadow-md"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-2">
        {room.gallery.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Thumbnail ${i}`}
            onClick={() => setSelectedImage(img)}
            className={`w-24 h-20 object-cover rounded-2xl cursor-pointer border-2 ${
              selectedImage === img ? "border-[var(--color-bg-dark)]" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
