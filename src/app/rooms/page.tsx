import { type Metadata } from "next";

import { getCurrentUser } from "@/auth";
import { NotFoundAlert } from "@/components/layout/not-found-alert";
import { CreateRoomPopup } from "@/components/room/create-room-popup";
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
  const user = await getCurrentUser();

  const isEmpty = rooms === null && invitations === null;

  return (
    <>
      <div className="flex flex-row justify-between px-2">
        <h1 className="text-center text-6xl">Rooms</h1>
        <div className="space-x-10">
          <CreateRoomPopup user={user} />
        </div>
      </div>
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
    </>
  );
};

export default RoomsPage;
