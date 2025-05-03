import { type Metadata } from "next";

import { RoomInvitations } from "@/components/rooms/rooms-invitations";
import { Rooms } from "@/components/rooms/rooms";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "View and manage your rooms on Eventeer. Track events, expenses, and collaborate with others in shared spaces."
};

const RoomsPage = () => (
  <div className="space-y-6">
    <h1 className="text-center text-6xl">Rooms</h1>
    <Rooms />
    <h1 className="mb-6 text-center">Invitations</h1>
    <RoomInvitations />
  </div>
);

export default RoomsPage;
