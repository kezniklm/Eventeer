import { type Metadata } from "next";

import { RoomInvitations } from "@/components/rooms/RoomInvitations";
import { Rooms } from "@/components/rooms/Rooms";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "View and manage your rooms on Eventeer. Track events, expenses, and collaborate with others in shared spaces."
};

const RoomsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-center text-6xl">Rooms</h1>
      <Rooms />
      <h1 className="text-center mb-6">Invitations</h1>
      <RoomInvitations />
    </div>
  );
};

export default RoomsPage;
