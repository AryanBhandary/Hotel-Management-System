import RoomsList from "../components/RoomList";

function AllRooms() {
  return (
    <>
      <div className="w-full h-[400px] relative">
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
          alt="get-started"
          className="w-full h-full object-cover brightness-50"
        />

        <div className="absolute inset-0 flex flex-row md:flex-row items-center gap-4 p-6">
          <div>
            <h1 className="md:text-left font-bold text-5xl text-[var(--color-secondary-light)]">
              Find your next stay
            </h1>
            <p className="font-semibold text-2xl text-[var(--color-secondary-light)]">
              Search low prices on hotels, homes and much more...
            </p>
          </div>
        </div>
      </div>
      <RoomsList />
    </>
  );
}

export default AllRooms;
