import { useParams } from "react-router-dom"; // Removed useNavigate
import rooms from "../../constants/roomsData";
import { useState, useEffect } from "react";
import Form from "./Form";

function Booking() {
    const { id } = useParams();
    const room = rooms.find((r) => r.id === Number(id));
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!room) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % room.gallery.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [room]);

    if (!room) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600 mt-[10%]">
                Room not found 😕
            </div>
        );
    }

    return (
        <div className="container">
            <div className="max-w-4xl mx-auto relative mt-25">
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
                            className={`w-3 h-3 rounded-full transition-all ${i === currentIndex ? "bg-black" : "bg-gray-400"}`}
                        ></button>
                    ))}
                </div>
                <div>
                    <h1 className="font-bold text-center mt-5 text-3xl">{room.type} Room</h1>
                    <Form />
                </div>
            </div>
        </div>
    );
}

export default Booking;
