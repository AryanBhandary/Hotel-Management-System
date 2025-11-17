import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    availability: { type: Boolean, default: true },
    guests: { type: Number, required: true },
    amenities: [{ type: String }],
    type: { type: String, required: true },
    bedPreference: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    gallery: [{ type: String }],
    size: { type: String },
    floor: { type: Number },
    view: { type: String },
    checkIn: { type: String },
    checkOut: { type: String },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    cancellationPolicy: { type: String },
    roomService: { type: String },
    breakfastIncluded: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false },
    smokingPolicy: { type: String, default: "Non-smoking" },
    parking: { type: String },
    accessible: { type: Boolean, default: false },
    specialFeatures: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
