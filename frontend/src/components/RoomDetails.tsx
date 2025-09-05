import { useParams } from "react-router-dom";
import { useState } from "react";
import rooms from "../data/roomsData";
import { motion, AnimatePresence } from "framer-motion";

export default function RoomDetails() {
  const { id } = useParams();
  const room = rooms.find((r) => r.id === Number(id));

  const [lightbox, setLightbox] = useState<string | null>(null);
  const [mapExpanded, setMapExpanded] = useState(false);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--color-secondary)]">
        Room not found 😕
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[var(--color-text-light-bg)] relative">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden shadow-md">
        <motion.img
          src={room.image}
          alt={room.type}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white drop-shadow"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {room.type} – {room.bedPreference}
          </motion.h1>

          <motion.p
            className="text-white mt-2 text-lg opacity-90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ⭐ {room.rating} ({room.reviewsCount} reviews)
          </motion.p>

          <motion.p
            className="text-xl font-semibold text-[var(--color-primary)] mt-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            NPR {room.price.toLocaleString()}/night
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left */}
        <div className="lg:col-span-2 space-y-10">
          {/* Gallery */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {room.gallery.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt={`Gallery ${i}`}
                  className="rounded-xl shadow-md w-full h-48 object-cover cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setLightbox(img)}
                />
              ))}
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-[var(--color-secondary)] leading-relaxed">
              {room.description}
            </p>
          </section>

          {/* Quick Facts */}
          <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Size", value: room.size },
              { label: "Floor", value: room.floor },
              { label: "View", value: room.view },
              { label: "Check-In", value: room.checkIn },
              { label: "Check-Out", value: room.checkOut },
              { label: "Accessibility", value: room.accessible ? "Yes" : "No" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-4 bg-[var(--color-secondary-light)] rounded-xl"
                whileHover={{ scale: 1.03 }}
              >
                <p className="font-semibold">{item.label}</p>
                <p className="text-sm text-[var(--color-secondary)]">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </section>

          {/* Amenities */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((a, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[var(--color-secondary-light)] text-[var(--color-secondary)] cursor-pointer"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "var(--color-primary)",
                    color: "#fff",
                  }}
                >
                  {a}
                </motion.span>
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Special Features</h2>
            <ul className="list-disc list-inside space-y-1 text-[var(--color-secondary)]">
              {room.specialFeatures.map((f, i) => (
                <motion.li key={i} whileHover={{ x: 5 }}>
                  {f}
                </motion.li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="bg-[var(--color-accent)] shadow-lg rounded-2xl p-6 space-y-6 sticky top-20">
          {/* Price */}
          <div>
            <p className="text-3xl font-bold text-[var(--color-primary)]">
              NPR {room.price.toLocaleString()}
            </p>
            <p className="text-sm text-[var(--color-secondary)]">per night</p>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-sm relative">
            <iframe
              src={room.mapLink}
              className={`w-full ${mapExpanded ? "h-80" : "h-48"} border-0 transition-all duration-500`}
              title="city-map"
              loading="lazy"
            />
            <button
              onClick={() => setMapExpanded(!mapExpanded)}
              className="absolute bottom-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-xs"
            >
              {mapExpanded ? "Shrink Map" : "Expand Map"}
            </button>
          </div>

          {/* Rating */}
          <div>
            <p className="font-semibold mb-2">Rating</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[var(--color-primary)] h-2.5 rounded-full"
                style={{ width: `${(room.rating / 5) * 100}%` }}
              />
            </div>
            <p className="text-sm mt-1">
              ⭐ {room.rating} ({room.reviewsCount} reviews)
            </p>
          </div>

          {/* Policies */}
          <div className="space-y-2 text-sm text-[var(--color-secondary)]">
            <p><span className="font-semibold">Cancellation:</span> {room.cancellationPolicy}</p>
            <p><span className="font-semibold">Breakfast:</span> {room.breakfastIncluded ? "Included" : "Not included"}</p>
            <p><span className="font-semibold">Pets:</span> {room.petsAllowed ? "Allowed" : "Not allowed"}</p>
            <p><span className="font-semibold">Smoking:</span> {room.smokingPolicy}</p>
            <p><span className="font-semibold">Parking:</span> {room.parking}</p>
          </div>

          {/* Book Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl"
          >
            Book Now
          </motion.button>
        </aside>
      </div>

      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 bg-[var(--color-primary)] text-white px-6 py-3 rounded-full shadow-lg cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        📅 Book Now
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt="Expanded"
              className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
