"use client";

import { RoomCard } from "./RoomCard";

export const Rooms = () => {
  const handleLeave = (id: number) => {
    console.log("leave", id);
  };
  const handleAddUser = (id: number) => {
    console.log("Add user", id);
  };
  return (
    <div className="grid grid-cols-1 gap-6">
      <RoomCard
        id={3}
        title="Rooms name"
        badges={["Milan", "Lucia", "Anna", "David"]}
        handleLeave={() => handleLeave(3)}
        handleAddUser={() => handleAddUser(3)}
      />
      <RoomCard
        id={4}
        title="Rooms name"
        badges={["Milan"]}
        handleLeave={() => handleLeave(4)}
        handleAddUser={() => handleAddUser(4)}
      />
      <RoomCard
        id={5}
        title="Rooms name"
        badges={["Milan"]}
        handleLeave={() => handleLeave(5)}
        handleAddUser={() => handleAddUser(5)}
      />
    </div>
  );
};
