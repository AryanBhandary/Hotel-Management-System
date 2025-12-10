import roomsData from "../constants/roomsData";
import type { Room } from "../constants/types";
import { apiFetch, buildHeaders } from "./authUser";
type ApiRoom = {
  id: number;
  number: string;
  room_type: string;
  price_per_night: string | number;
  capacity: number;
  is_available: boolean;
};

const roomTypeMap: Record<string, Room["type"]> = {
  single: "Single",
  double: "Double",
  suite: "Suite",
  family_suite: "Family Suite",
};

const mapRoomType = (roomType: string): Room["type"] => {
  return roomTypeMap[roomType] ?? "Single";
};

const mergeRoomData = (apiRoom: ApiRoom): Room => {
  const fallback = roomsData.find((room) => room.id === apiRoom.id);
  const mappedType = mapRoomType(apiRoom.room_type);

  const base: Room =
    fallback ??
    ({
      id: apiRoom.id,
      availability: apiRoom.is_available,
      guests: apiRoom.capacity,
      amenities: ["WiFi"],
      type: mappedType,
      bedPreference: "Queen Size",
      description: "Room details coming soon.",
      price: Number(apiRoom.price_per_night) || 0,
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80"],
      size: "25 sqm",
      floor: 1,
      view: "City view",
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      rating: 4.2,
      reviewsCount: 0,
      cancellationPolicy: "Contact hotel for cancellation details.",
      roomService: "Available",
      breakfastIncluded: false,
      petsAllowed: false,
      smokingPolicy: "Non-smoking",
      parking: "On-site parking",
      accessible: true,
      specialFeatures: [],
    } as Room);

  return {
    ...base,
    id: apiRoom.id,
    availability: apiRoom.is_available,
    guests: apiRoom.capacity,
    type: mappedType,
    price: Number(apiRoom.price_per_night),
  };
};

export const fetchRooms = async (): Promise<Room[]> => {
  const apiRooms = await apiFetch("/rooms/");
  if (!Array.isArray(apiRooms)) return roomsData;
  return apiRooms.map((room: ApiRoom) => mergeRoomData(room));
};

export const fetchRoomById = async (id: number): Promise<Room | null> => {
  try {
    const apiRoom = await apiFetch(`/rooms/${id}/`);
    return mergeRoomData(apiRoom as ApiRoom);
  } catch {
    const fallback = roomsData.find((room) => room.id === id);
    return fallback ?? null;
  }
};

type BookingPayload = {
  roomId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
};

export const createBooking = async (payload: BookingPayload, token: string) => {
  if (!token) {
    throw new Error("You need to log in first.");
  }

  return apiFetch("/bookings/", {
    method: "POST",
    headers: buildHeaders({
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify({
      room: payload.roomId,
      check_in: payload.checkIn,
      check_out: payload.checkOut,
      guests: payload.guests,
    }),
  });
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  image_url: string;
  order: number;
};

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const data = await apiFetch("/team/");
  if (!Array.isArray(data)) return [];
  return data as TeamMember[];
};

