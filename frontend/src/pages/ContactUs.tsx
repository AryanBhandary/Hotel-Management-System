import { MapPin, Phone, Mail } from "lucide-react";

function ContactUs() {
    return (
        <div className="bg-gray-50 text-gray-900">
            {/* Hero Section */}
            <div className="w-full h-[300px] relative">
                <img
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                    alt="Contact Us"
                    className="w-full h-full object-cover brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                        Get in Touch
                    </h1>
                </div>
            </div>

            {/* Contact Content */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Left: Contact Form */}
                <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
                    
                    <form className="flex flex-col gap-4 flex-1">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
                        />
                        <textarea
                            rows={5}
                            placeholder="Your Message"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none resize-none"
                        />

                        {/* Button now inside form */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Friendly Footer (fills space & adds life) */}
                    <div className="text-center mt-6 text-sm text-gray-500">
                        <p>📞 Our support team replies within 24 hours.</p>
                        <p className="mt-1">Available Mon–Fri, 9 AM – 6 PM</p>
                    </div>
                </div>

                {/* Right: Info + Map */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white p-8 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
                        <div className="flex items-center gap-4 mb-4">
                            <MapPin className="text-gray-700 cursor-pointer" />
                            <p>123 LHotel XYZ, Kathmandu, Nepal</p>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <Phone className="text-gray-700 cursor-pointer" />
                            <p>+977 9800000000</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="text-gray-700 cursor-pointer" />
                            <p>info@hotelxyz.com</p>
                        </div>
                    </div>

                    {/* Embedded Google Map */}
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Find Us on Map</h2>
                        <div className="rounded-lg overflow-hidden w-full h-[250px]">
                            <iframe
                                title="Hotel Location – Tribhuvan International Airport"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5857261638184!2d85.35409947626444!3d27.699196225849416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1a266b342bc5%3A0x73bbfa829a89af1b!2sTribhuvan%20International%20Airport!5e0!3m2!1sen!2snp!4v1756478325413!5m2!1sen!2snp"
                                className="w-full h-full border-0"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
