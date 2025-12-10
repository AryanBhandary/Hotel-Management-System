import roomsData from "../constants/roomsData";
import type { Room } from "../constants/types";
import { apiFetch, buildHeaders, API_BASE_URL, handleResponse } from "./authUser";
import type { AuthenticatedUser } from "./authUser";
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

export type GalleryImage = {
  id: number;
  title: string;
  image: string;
  is_featured: boolean;
  created_at: string;
};

export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  const data = await apiFetch("/gallery/");
  if (!Array.isArray(data)) return [];
  return data as GalleryImage[];
};

export const createRoom = async (payload: Partial<Room>, token: string) => {
  if (!token) throw new Error("Login required.");
  return apiFetch("/admin/rooms/", {
    method: "POST",
    headers: buildHeaders({ Authorization: `Bearer ${token}` }),
    body: JSON.stringify({
      number: payload.number,
      room_type: payload.type?.toLowerCase().replace(" ", "_"),
      price_per_night: payload.price,
      capacity: payload.guests,
      is_available: payload.availability ?? true,
    }),
  });
};

export const updateRoom = async (id: number, payload: Partial<Room>, token: string) => {
  if (!token) throw new Error("Login required.");
  return apiFetch(`/admin/rooms/${id}/`, {
    method: "PUT",
    headers: buildHeaders({ Authorization: `Bearer ${token}` }),
    body: JSON.stringify({
      number: payload.number,
      room_type: payload.type?.toLowerCase().replace(" ", "_"),
      price_per_night: payload.price,
      capacity: payload.guests,
      is_available: payload.availability ?? true,
    }),
  });
};

export const deleteRoom = async (id: number, token: string) => {
  if (!token) throw new Error("Login required.");
  return apiFetch(`/admin/rooms/${id}/`, {
    method: "DELETE",
    headers: buildHeaders({ Authorization: `Bearer ${token}` }),
  });
};

export const uploadGalleryImage = async (file: File, title: string, is_featured: boolean, token: string) => {
  if (!token) throw new Error("Login required.");
  const form = new FormData();
  form.append("image", file);
  if (title) form.append("title", title);
  form.append("is_featured", String(is_featured));

  const response = await fetch(`${API_BASE_URL}/admin/gallery/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  return handleResponse(response);
};

export const deleteGalleryImage = async (id: number, token: string) => {
  if (!token) throw new Error("Login required.");
  return apiFetch(`/admin/gallery/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateGalleryImage = async (id: number, payload: { title?: string; is_featured?: boolean }, token: string) => {
  if (!token) throw new Error("Login required.");
  const form = new FormData();
  if (typeof payload.title !== "undefined") form.append("title", payload.title);
  if (typeof payload.is_featured !== "undefined") form.append("is_featured", String(payload.is_featured));

  const response = await fetch(`${API_BASE_URL}/admin/gallery/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  return handleResponse(response);
};

export type AdminBooking = {
  id: number;
  user: AuthenticatedUser;
  room_detail: Room;
  room: number;
  check_in: string;
  check_out: string;
  guests: number;
  status: string;
  created_at: string;
};

export const fetchAdminBookings = async (token: string): Promise<AdminBooking[]> => {
  if (!token) throw new Error("Login required.");
  const data = await apiFetch("/admin/bookings/", {
    headers: buildHeaders({ Authorization: `Bearer ${token}` }),
  });
  if (!Array.isArray(data)) return [];
  return data as AdminBooking[];
};

export const updateBookingStatus = async (id: number, status: string, token: string) => {
  if (!token) throw new Error("Login required.");
  return apiFetch(`/admin/bookings/${id}/`, {
    method: "PATCH",
    headers: buildHeaders({ Authorization: `Bearer ${token}` }),
    body: JSON.stringify({ status }),
  });
};

export const fetchUsers = async (token: string): Promise<AuthenticatedUser[]> => {
  if (!token) throw new Error("Login required.");
  const data = await apiFetch("/admin/users/", {
    headers: buildHeaders({ Authorization: `Bearer ${token}` }),
  });
  if (!Array.isArray(data)) return [];
  return data as AuthenticatedUser[];
};

export const createUser = async (payload: { username: string; email: string; password: string; is_staff?: boolean }, token: string) => {
  if (!token) throw new Error("Login required.");
  return apiFetch("/admin/users/", {
    method: "POST",
    headers: buildHeaders({ Authorization: `Bearer ${token}` }),
    body: JSON.stringify(payload),
  });
};

export const updateUser = async (id: number, payload: Partial<AuthenticatedUser>, token: string) => {
  if (!token) throw new Error("Login required.");
  return apiFetch(`/admin/users/${id}/`, {
    method: "PATCH",
    headers: buildHeaders({ Authorization: `Bearer ${token}` }),
    body: JSON.stringify(payload),
  });
};

export const deleteUser = async (id: number, token: string) => {
  if (!token) throw new Error("Login required.");
  return apiFetch(`/admin/users/${id}/`, {
    method: "DELETE",
    headers: buildHeaders({ Authorization: `Bearer ${token}` }),
  });
};

export const fetchTeam = async () => fetchTeamMembers();

export const createTeamMember = async (payload: { name: string; role: string; image_url?: string; order?: number }, token: string) => {
  if (!token) throw new Error("Login required.");
  return apiFetch("/admin/team/", {
    method: "POST",
    headers: buildHeaders({ Authorization: `Bearer ${token}` }),
    body: JSON.stringify(payload),
  });
};

export const updateTeamMember = async (id: number, payload: { name?: string; role?: string; image_url?: string; order?: number }, token: string) => {
  if (!token) throw new Error("Login required.");
  return apiFetch(`/admin/team/${id}/`, {
    method: "PATCH",
    headers: buildHeaders({ Authorization: `Bearer ${token}` }),
    body: JSON.stringify(payload),
  });
};

export const deleteTeamMember = async (id: number, token: string) => {
  if (!token) throw new Error("Login required.");
  return apiFetch(`/admin/team/${id}/`, {
    method: "DELETE",
    headers: buildHeaders({ Authorization: `Bearer ${token}` }),
  });
};

