import { auth } from "@/auth";
import { getInvitedRoomsForUser, getRoomUsersNames } from "@/repository/rooms";
import { acceptRoomInvitationAction, declineRoomInvitationAction } from "@/server-actions/rooms";

import { RoomCard } from "./RoomCard";

export const RoomInvitations = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    return;
  }

  const userInvitationRooms = await getInvitedRoomsForUser(userId);

  const handleAcceptInvitation = async (roomId: number, userId: string) => {
    await acceptRoomInvitationAction(roomId, userId);
  };

  const handleDeclineInvitation = async (roomId: number, userId: string) => {
    await declineRoomInvitationAction(roomId, userId);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {userInvitationRooms.map(async (room) => (
        <RoomCard
          id={room.id}
          key={room.id}
          title={room.name}
          badges={await getRoomUsersNames(room.id)}
          handleAccept={() => handleAcceptInvitation(room.id, userId)}
          handleDecline={() => handleDeclineInvitation(room.id, userId)}
        />
      ))}
    </div>
  );
};
