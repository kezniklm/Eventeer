import { auth } from "@/auth";
import { getInvitedRoomsForUser, getRoomUsersNames } from "@/repository/rooms";

import { RoomInvitationCardWrapper } from "./rooms-invitation-card-wrapper";

export const UserRoomInvitations = async () => {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  const userInvitationRooms = await getInvitedRoomsForUser(userId);

  if (userInvitationRooms.length === 0) {
    return null;
  }

  const roomsWithBadges = await Promise.all(
    userInvitationRooms.map(async (room) => ({
      room,
      badges: (await getRoomUsersNames(room.id)).map((r) => r.name).filter((name): name is string => name !== null)
    }))
  );

  return (
    <div className="space-y-6">
      <h1 className="mb-6 text-center">Invitations</h1>
      <div className="grid grid-cols-1 gap-6">
        {roomsWithBadges.map(({ room, badges }) => (
          <RoomInvitationCardWrapper key={room.id} room={room} userId={userId} badges={badges} />
        ))}
      </div>
    </div>
  );
};
