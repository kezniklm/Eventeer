"use client";

import { RoomCard } from "./RoomCard";

export const RoomInvitations = () => {
  const handleAccept = (id: number) => {
    console.log("Accept", id);
  };
  const handleDecline = (id: number) => {
    console.log("Decline", id);
  };
  return (
    <div className="grid grid-cols-1 gap-6">
      <RoomCard
        id={1}
        title="Rooms name"
        badges={["Milan", "Lucia", "Anna", "David"]}
        handleAccept={() => handleAccept(1)}
        handleDecline={() => handleDecline(1)}
      />
      <RoomCard
        id={2}
        title="Rooms name"
        badges={["Milan"]}
        handleAccept={() => handleAccept(2)}
        handleDecline={() => handleDecline(2)}
      />
    </div>
  );
};
