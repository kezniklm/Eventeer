import { type Metadata } from "next";
import { XCircle } from "lucide-react";

import { UserRoomInvitations } from "@/components/rooms/rooms-invitations";
import { UserRooms } from "@/components/rooms/user-rooms";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "View and manage your rooms on Eventeer. Track events, expenses, and collaborate with others in shared spaces."
};

const RoomsPage = async () => {
  const rooms = await UserRooms();
  const invitations = await UserRoomInvitations();

  const isEmpty = rooms === null && invitations === null;

  return (
    <div className="space-y-6">
      {isEmpty ? (
        <div className="flex h-[70vh] flex-col items-center justify-center text-gray-600">
          <XCircle className="mb-6 h-24 w-24" style={{ color: "var(--primary)" }} />
          <p className="text-2xl font-semibold" style={{ color: "var(--primary)" }}>
            No rooms or invitations
          </p>
          <p className="mt-1 text-lg text-gray-500">You haven’t joined or been invited to any rooms yet.</p>
        </div>
      ) : (
        <>
          {rooms}
          {invitations}
        </>
      )}
    </div>
  );
};

export default RoomsPage;
