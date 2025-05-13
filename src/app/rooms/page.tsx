import { type Metadata } from "next";

import { NotFoundAlert } from "@/components/layout/not-found-alert";
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
        <NotFoundAlert
          title="No rooms or invitations"
          description="You haven’t joined or been invited to any rooms yet."
        />
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
