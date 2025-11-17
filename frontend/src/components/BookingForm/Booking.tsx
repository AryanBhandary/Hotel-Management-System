import { useParams } from "react-router-dom";
import rooms from "../../constants/roomsData";
import { useState, useEffect } from "react";
import Form from "./Form";
import Invoice from "./Invoice";

function Booking() {
  const { id } = useParams();
  const room = rooms.find((r) => r.id === Number(id));
  const [currentIndex, setCurrentIndex] = useState(0);

  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    if (!room || bookingDetails) return; // stop gallery when invoice is shown

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % room.gallery.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [room, bookingDetails]);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 mt-[10%]">
        Room not found 😕
      </div>
    );
  }

  const handleBookingSubmit = (details: any) => {
    console.log("Booking submitted:", details);
    setBookingDetails(details);
  };

  return (
    <div className="container">
      {!bookingDetails ? (
        <>
          <div className="mx-auto relative">
            <img
              src={room.gallery[currentIndex]}
              alt="Room"
              className="w-full h-[450px] object-cover rounded-xl shadow-lg transition-all duration-500"
            />
            <div className="flex justify-center mt-3 space-x-2">
              {room.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentIndex ? "bg-black" : "bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto items-center text-center">
            <h1 className="font-bold mt-5 text-3xl">Hotel Reservation Form</h1>
            <div className="text-[var(--color-secondary)] mt-0">
              Please complete the form below.
            </div>
            <div className="text-[var(--color-secondary)] mt-10 mb-5">
              Your registration will be verified prior to your arrival.
            </div>
            <Form room={room} onSubmit={handleBookingSubmit} />
          </div>
        </>
      ) : (
        <Invoice bookingDetails={bookingDetails} /> // Only invoice shown here
      )}
    </div>
  );
}

export default Booking;
