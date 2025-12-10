import { useEffect, useMemo, useState } from "react";
import {
  fetchRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  fetchGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
  updateGalleryImage,
  fetchAdminBookings,
  updateBookingStatus,
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  fetchTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../../services/hotelApi";
import type { Room } from "../../constants/types";
import type { GalleryImage, AdminBooking } from "../../services/hotelApi";
import type { AuthenticatedUser } from "../../services/authUser";

const emptyRoom: Partial<Room> = {
  id: 0,
  number: "",
  type: "Single",
  price: 0,
  guests: 1,
  availability: true,
  bedPreference: "Queen Size",
  amenities: ["WiFi"],
  description: "",
  image: "",
  gallery: [],
  size: "",
  floor: 1,
  view: "",
  checkIn: "",
  checkOut: "",
  rating: 0,
  reviewsCount: 0,
  cancellationPolicy: "",
  roomService: "",
  breakfastIncluded: false,
  petsAllowed: false,
  smokingPolicy: "",
  parking: "",
  accessible: false,
  specialFeatures: [],
};

const AdminDashboard = () => {
  const token = localStorage.getItem("token") || "";

  const [activeTab, setActiveTab] = useState<"overview" | "rooms" | "gallery" | "bookings" | "users" | "team">("overview");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [roomForm, setRoomForm] = useState<Partial<Room>>(emptyRoom);
  const [isEditing, setIsEditing] = useState(false);
  const [savingRoom, setSavingRoom] = useState(false);

  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryError, setGalleryError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  const [users, setUsers] = useState<AuthenticatedUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [userForm, setUserForm] = useState<{ id?: number; username: string; email: string; password?: string; is_staff?: boolean }>({
    username: "",
    email: "",
    password: "",
    is_staff: false,
  });
  const [savingUser, setSavingUser] = useState(false);

  const [team, setTeam] = useState<{ id?: number; name: string; role: string; image_url?: string; order?: number }[]>([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamForm, setTeamForm] = useState<{ id?: number; name: string; role: string; image_url?: string; order?: number }>({
    name: "",
    role: "",
    image_url: "",
    order: team.length + 1,
  });
  const [savingTeam, setSavingTeam] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoadingRooms(true);
      setGalleryLoading(true);
      setGalleryError("");
      setBookingsLoading(true);
      setUsersLoading(true);
      setTeamLoading(true);
      try {
        const [roomData, galleryData, bookingData, userData, teamData] = await Promise.all([
          fetchRooms(),
          fetchGalleryImages(),
          fetchAdminBookings(token),
          fetchUsers(token),
          fetchTeam(),
        ]);
        setRooms(roomData);
        setGallery(galleryData);
        setBookings(bookingData);
        setUsers(userData);
        setTeam(teamData);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load dashboard data.";
        setGalleryError(message);
      } finally {
        setLoadingRooms(false);
        setGalleryLoading(false);
        setBookingsLoading(false);
        setUsersLoading(false);
        setTeamLoading(false);
      }
    };

    load();
  }, [token]);

  const handleSaveRoom = async () => {
    if (!roomForm.number || !roomForm.type) return;
    setSavingRoom(true);
    try {
      if (isEditing && roomForm.id) {
        await updateRoom(roomForm.id, roomForm, token);
      } else {
        await createRoom(roomForm, token);
      }
      const refreshed = await fetchRooms();
      setRooms(refreshed);
      setRoomForm(emptyRoom);
      setIsEditing(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Unable to save room.");
    } finally {
      setSavingRoom(false);
    }
  };

  const handleEdit = (room: Room) => {
    setRoomForm(room);
    setIsEditing(true);
    setActiveTab("rooms");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteRoom = async (id: number) => {
    if (!confirm("Delete this room?")) return;
    try {
      await deleteRoom(id, token);
      setRooms((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Unable to delete room.");
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("image") as File | null;
    if (!file) {
      alert("Please choose an image.");
      return;
    }
    setUploading(true);
    try {
      await uploadGalleryImage(file, formData.get("title") as string, formData.get("is_featured") === "on", token);
      const refreshed = await fetchGalleryImages();
      setGallery(refreshed);
      e.currentTarget.reset();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateGallery = async (id: number, title: string, is_featured: boolean) => {
    try {
      await updateGalleryImage(id, { title, is_featured }, token);
      const refreshed = await fetchGalleryImages();
      setGallery(refreshed);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed.");
    }
  };

  const handleDeleteImage = async (id: number) => {
    if (!confirm("Delete this image?")) return;
    try {
      await deleteGalleryImage(id, token);
      setGallery((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete.");
    }
  };

  const handleBookingStatus = async (id: number, status: string) => {
    try {
      await updateBookingStatus(id, status, token);
      const refreshed = await fetchAdminBookings(token);
      setBookings(refreshed);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update booking.");
    }
  };

  const handleSaveUser = async () => {
    if (!userForm.username || !userForm.email) return;
    setSavingUser(true);
    try {
      if (userForm.id) {
        await updateUser(userForm.id, { username: userForm.username, email: userForm.email, is_staff: userForm.is_staff }, token);
      } else {
        await createUser(
          { username: userForm.username, email: userForm.email, password: userForm.password || "TempPass123!", is_staff: userForm.is_staff },
          token
        );
      }
      const refreshed = await fetchUsers(token);
      setUsers(refreshed);
      setUserForm({ username: "", email: "", password: "", is_staff: false });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save user.");
    } finally {
      setSavingUser(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Delete this user?")) return;
    try {
      await deleteUser(id, token);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user.");
    }
  };

  const handleSaveTeam = async () => {
    if (!teamForm.name || !teamForm.role) return;
    setSavingTeam(true);
    try {
      if (teamForm.id) {
        await updateTeamMember(teamForm.id, teamForm, token);
      } else {
        await createTeamMember(teamForm, token);
      }
      const refreshed = await fetchTeam();
      setTeam(refreshed);
      setTeamForm({ name: "", role: "", image_url: "", order: team.length + 1 });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save team member.");
    } finally {
      setSavingTeam(false);
    }
  };

  const handleDeleteTeam = async (id: number) => {
    if (!confirm("Delete this team member?")) return;
    try {
      await deleteTeamMember(id, token);
      setTeam((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete team member.");
    }
  };

  const roomCount = rooms.length;
  const featuredImages = useMemo(() => gallery.filter((g) => g.is_featured).length, [gallery]);
  const bookingCount = bookings.length;
  const userCount = users.length;

  const bookingsByRoom = useMemo(() => {
    const map: Record<number, AdminBooking[]> = {};
    bookings.forEach((b) => {
      map[b.room] = map[b.room] ? [...map[b.room], b] : [b];
    });
    return map;
  }, [bookings]);

  return (
    <div className="pt-24 pb-16 bg-[var(--color-accent)] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Admin</p>
          <h1 className="text-3xl font-bold text-[var(--color-secondary)]">Control Panel</h1>
          <p className="text-gray-600">Manage rooms and gallery assets.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { key: "overview", label: "Overview" },
            { key: "rooms", label: "Rooms" },
            { key: "bookings", label: "Bookings" },
            { key: "gallery", label: "Gallery" },
            { key: "users", label: "Users" },
            { key: "team", label: "Team" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === tab.key ? "bg-black text-white shadow-md" : "bg-white text-[var(--color-secondary)] border border-[var(--color-border)] hover:border-black/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm">
              <p className="text-sm text-gray-500">Rooms</p>
              <p className="text-2xl font-semibold">{roomCount}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm">
              <p className="text-sm text-gray-500">Gallery items</p>
              <p className="text-2xl font-semibold">{gallery.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm">
              <p className="text-sm text-gray-500">Featured images</p>
              <p className="text-2xl font-semibold">{featuredImages}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm">
              <p className="text-sm text-gray-500">Bookings</p>
              <p className="text-2xl font-semibold">{bookingCount}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm">
              <p className="text-sm text-gray-500">Users</p>
              <p className="text-2xl font-semibold">{userCount}</p>
            </div>
          </div>
        )}

        {activeTab === "rooms" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 p-5 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{isEditing ? "Edit room" : "Add room"}</h2>
                {isEditing && (
                  <button
                    className="text-sm text-gray-500 underline"
                    onClick={() => {
                      setIsEditing(false);
                      setRoomForm(emptyRoom);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <input
                  className="form-input"
                  placeholder="Number"
                  value={roomForm.number || ""}
                  onChange={(e) => setRoomForm((p) => ({ ...p, number: e.target.value }))}
                />
                <select
                  className="form-input"
                  value={roomForm.type || "Single"}
                  onChange={(e) => setRoomForm((p) => ({ ...p, type: e.target.value as Room["type"] }))}
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                  <option value="Family Suite">Family Suite</option>
                </select>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Price per night"
                  value={roomForm.price ?? 0}
                  onChange={(e) => setRoomForm((p) => ({ ...p, price: Number(e.target.value) }))}
                />
                <input
                  type="number"
                  className="form-input"
                  placeholder="Capacity"
                  value={roomForm.guests ?? 1}
                  onChange={(e) => setRoomForm((p) => ({ ...p, guests: Number(e.target.value) }))}
                />
                <input
                  className="form-input"
                  placeholder="Image URL"
                  value={roomForm.image || ""}
                  onChange={(e) => setRoomForm((p) => ({ ...p, image: e.target.value }))}
                />
                <textarea
                  className="form-input"
                  placeholder="Description"
                  value={roomForm.description || ""}
                  onChange={(e) => setRoomForm((p) => ({ ...p, description: e.target.value }))}
                />
                <button
                  className="sub-btn"
                  onClick={handleSaveRoom}
                  disabled={savingRoom}
                >
                  {savingRoom ? "Saving..." : isEditing ? "Update room" : "Create room"}
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              {loadingRooms ? (
                <p className="text-gray-600">Loading rooms...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rooms.map((room) => (
                    <div key={room.id} className="p-4 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">{room.number}</p>
                          <p className="text-lg font-semibold">{room.type}</p>
                        </div>
                        <span className="text-sm font-semibold">NPR {room.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{room.description}</p>
                      {bookingsByRoom[room.id]?.length ? (
                        <p className="text-xs text-gray-500 mt-2">{bookingsByRoom[room.id].length} bookings</p>
                      ) : (
                        <p className="text-xs text-gray-400 mt-2">No bookings yet</p>
                      )}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          className="px-3 py-1 rounded-full text-sm bg-black text-white"
                          onClick={() => handleEdit(room)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 rounded-full text-sm border border-red-200 text-red-600"
                          onClick={() => handleDeleteRoom(room.id)}
                        >
                          Delete
                        </button>
                      </div>
                      {bookingsByRoom[room.id]?.length ? (
                        <div className="mt-3 space-y-1">
                          {bookingsByRoom[room.id].slice(0, 3).map((b) => (
                            <div key={b.id} className="text-xs text-gray-600 flex items-center justify-between">
                              <span>#{b.id} • {b.user.username}</span>
                              <span className="uppercase text-[10px] px-2 py-1 rounded-full bg-gray-100">{b.status}</span>
                            </div>
                          ))}
                          {bookingsByRoom[room.id].length > 3 && (
                            <p className="text-[10px] text-gray-500">+{bookingsByRoom[room.id].length - 3} more</p>
                          )}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <form onSubmit={handleUpload} className="lg:col-span-1 p-5 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm space-y-3">
              <h2 className="text-lg font-semibold">Upload image</h2>
              <input name="title" className="form-input" placeholder="Title" />
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="is_featured" />
                Featured
              </label>
              <input name="image" type="file" accept="image/*" className="form-input" />
              <button className="sub-btn" type="submit" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </form>

            <div className="lg:col-span-2 space-y-3">Unsupported Media Type: /api/admin/gallery/1/
[10/Dec/2025 08:55:29] "PATCH /api/admin/gallery/1/ HTTP/1.1" 415 68
Unsupported Media Type: /api/admin/gallery/6/
[10/Dec/2025 08:55:45] "PATCH /api/admin/gallery/6/ HTTP/1.1" 415 68
              {galleryLoading ? (
                <p className="text-gray-600">Loading gallery...</p>
              ) : galleryError ? (
                <p className="text-red-600">{galleryError}</p>
              ) : gallery.length === 0 ? (
                <p className="text-gray-600">No images yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((img) => (
                    <div key={img.id} className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
                      <img src={img.image} alt={img.title || "Gallery"} className="h-48 w-full object-cover" />
                      <div className="p-3 flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            className="form-input text-sm"
                            value={img.title || ""}
                            onChange={(e) => handleUpdateGallery(img.id, e.target.value, img.is_featured)}
                            placeholder="Title"
                          />
                          <label className="flex items-center gap-1 text-[10px] text-gray-700">
                            <input
                              type="checkbox"
                              checked={img.is_featured}
                              onChange={(e) => handleUpdateGallery(img.id, img.title || "", e.target.checked)}
                            />
                            Featured
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] text-gray-500">{new Date(img.created_at).toLocaleDateString()}</p>
                          <button
                            className="text-sm text-red-600 underline"
                            onClick={() => handleDeleteImage(img.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-4">
            {bookingsLoading ? (
              <p className="text-gray-600">Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <p className="text-gray-600">No bookings found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Booking #{b.id}</p>
                        <p className="text-lg font-semibold">{b.user.username}</p>
                      </div>
                      <select
                        className="form-input w-32"
                        value={b.status}
                        onChange={(e) => handleBookingStatus(b.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <p className="text-sm text-gray-600">Room: {b.room_detail?.number || b.room_detail?.type}</p>
                    <p className="text-sm text-gray-600">Guests: {b.guests}</p>
                    <p className="text-sm text-gray-600">Check-in: {b.check_in}</p>
                    <p className="text-sm text-gray-600">Check-out: {b.check_out}</p>
                    <p className="text-[11px] text-gray-400">Created: {new Date(b.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "users" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 p-5 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm space-y-3">
              <h2 className="text-lg font-semibold">{userForm.id ? "Edit user" : "Create user"}</h2>
              <input
                className="form-input"
                placeholder="Username"
                value={userForm.username}
                onChange={(e) => setUserForm((p) => ({ ...p, username: e.target.value }))}
              />
              <input
                className="form-input"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) => setUserForm((p) => ({ ...p, email: e.target.value }))}
              />
              {!userForm.id && (
                <input
                  className="form-input"
                  placeholder="Password"
                  type="password"
                  value={userForm.password}
                  onChange={(e) => setUserForm((p) => ({ ...p, password: e.target.value }))}
                />
              )}
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={userForm.is_staff}
                  onChange={(e) => setUserForm((p) => ({ ...p, is_staff: e.target.checked }))}
                />
                Admin
              </label>
              <div className="flex items-center gap-2">
                <button className="sub-btn" onClick={handleSaveUser} disabled={savingUser}>
                  {savingUser ? "Saving..." : userForm.id ? "Update user" : "Create user"}
                </button>
                {userForm.id && (
                  <button
                    className="text-sm text-gray-500 underline"
                    onClick={() => setUserForm({ username: "", email: "", password: "", is_staff: false })}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              {usersLoading ? (
                <p className="text-gray-600">Loading users...</p>
              ) : users.length === 0 ? (
                <p className="text-gray-600">No users found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {users.map((u) => (
                    <div key={u.id} className="p-4 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">ID {u.id}</p>
                          <p className="text-lg font-semibold">{u.username}</p>
                          <p className="text-sm text-gray-600">{u.email}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{u.is_staff ? "Admin" : "User"}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          className="px-3 py-1 rounded-full text-sm bg-black text-white"
                          onClick={() => setUserForm({ id: u.id, username: u.username, email: u.email, is_staff: u.is_staff })}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 rounded-full text-sm border border-red-200 text-red-600"
                          onClick={() => handleDeleteUser(u.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 p-5 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm space-y-3">
              <h2 className="text-lg font-semibold">{teamForm.id ? "Edit team member" : "Add team member"}</h2>
              <input
                className="form-input"
                placeholder="Name"
                value={teamForm.name}
                onChange={(e) => setTeamForm((p) => ({ ...p, name: e.target.value }))}
              />
              <input
                className="form-input"
                placeholder="Role"
                value={teamForm.role}
                onChange={(e) => setTeamForm((p) => ({ ...p, role: e.target.value }))}
              />
              <input
                className="form-input"
                placeholder="Image URL"
                value={teamForm.image_url || ""}
                onChange={(e) => setTeamForm((p) => ({ ...p, image_url: e.target.value }))}
              />
              <input
                className="form-input"
                type="number"
                placeholder="Order"
                value={teamForm.order ?? team.length + 1}
                onChange={(e) => setTeamForm((p) => ({ ...p, order: Number(e.target.value) }))}
              />
              <div className="flex items-center gap-2">
                <button className="sub-btn" onClick={handleSaveTeam} disabled={savingTeam}>
                  {savingTeam ? "Saving..." : teamForm.id ? "Update member" : "Add member"}
                </button>
                {teamForm.id && (
                  <button
                    className="text-sm text-gray-500 underline"
                    onClick={() => setTeamForm({ name: "", role: "", image_url: "", order: team.length + 1 })}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              {teamLoading ? (
                <p className="text-gray-600">Loading team...</p>
              ) : team.length === 0 ? (
                <p className="text-gray-600">No team members yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {team.map((member) => (
                    <div key={member.id} className="p-4 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Order {member.order}</p>
                          <p className="text-lg font-semibold">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                        <div className="flex gap-2">
                          {member.image_url && <img src={member.image_url} alt={member.name} className="h-12 w-12 object-cover rounded-full" />}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          className="px-3 py-1 rounded-full text-sm bg-black text-white"
                          onClick={() => setTeamForm(member)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 rounded-full text-sm border border-red-200 text-red-600"
                          onClick={() => handleDeleteTeam(member.id!)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

