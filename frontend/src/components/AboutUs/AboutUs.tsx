import { FaConciergeBell, FaUtensils, FaSpa } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="bg-white text-gray-800">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-100 via-white to-gray-100">
          <div className="max-w-6xl mx-auto px-6 md:flex md:items-center md:justify-between py-20 gap-10">
            <div className="md:w-1/2 space-y-6">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-black"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Welcome to Luxuria Hotel
              </motion.h1>

              <motion.p
                className="text-gray-700"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Experience comfort, luxury, and exceptional hospitality at our premium hotel.
                We create memorable stays for every guest with world-class amenities and service.
              </motion.p>

              <motion.button
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/allRooms")}
              >
                Explore Rooms
              </motion.button>
            </div>

            <motion.div
              className="md:w-1/2 mt-10 md:mt-0"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=80"
                alt="Hotel Lobby"
                className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-black mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Our Premium Services
            </motion.h2>
            <motion.p
              className="text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              From wellness to fine dining, we provide exceptional services that make every stay unforgettable.
            </motion.p>
          </div>

          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[{
              icon: <FaConciergeBell />,
              title: "24/7 Concierge",
              desc: "Our concierge team is available round the clock to cater to all your needs."
            }, {
              icon: <FaUtensils />,
              title: "Fine Dining",
              desc: "Savor exquisite cuisine prepared by our award-winning chefs."
            }, {
              icon: <FaSpa />,
              title: "Spa & Wellness",
              desc: "Rejuvenate your mind and body at our luxurious spa and wellness center."
            }].map((service, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 p-8 rounded-xl shadow-md flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                <div className="text-4xl text-black mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-gray-100 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-black mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              Our Journey
            </motion.h2>
            <motion.p
              className="text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              From humble beginnings to becoming a premier hospitality brand.
            </motion.p>
          </div>

          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
            {[
              { year: "2005", desc: "Founded with a vision to redefine luxury hospitality." },
              { year: "2012", desc: "Expanded to multiple locations with exceptional service standards." },
              { year: "2023", desc: "Recognized as a top-tier hospitality brand with award-winning services." }
            ].map((event, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md text-center md:text-left flex-1 cursor-pointer hover:shadow-lg transition-shadow"
                whileHover={{ y: -3 }}
              >
                <h3 className="font-bold text-black mb-2">{event.year}</h3>
                <p className="text-gray-600">{event.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-black mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              className="text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Our dedicated professionals ensure your stay is flawless and memorable.
            </motion.p>
          </div>

          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Sujal Shrestha", role: "General Manager", img: "" },
              { name: "Prakash Poudel", role: "Head Chef", img: "" },
              { name: "Anisha Adhikari", role: "Spa Manager", img: "" },
              { name: "Sandhya Basnet", role: "Concierge Lead", img: "" }
            ].map((member, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 rounded-xl shadow-md overflow-hidden text-center cursor-pointer hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <img
                  src={member.img || "https://via.placeholder.com/300x220"}
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-black mb-1">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default AboutUs;
