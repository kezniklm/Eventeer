import { auth } from "@/auth";
import { getMemberRoomsForUser, getRoomUsersNames } from "@/repository/rooms";
import { declineRoomInvitationAction, leaveRoomAction } from "@/server-actions/rooms";

import { RoomCard } from "./RoomCard";

export const Rooms = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    return;
  }

  const userMemberRooms = await getMemberRoomsForUser("1");

  const handleLeave = async (roomId: number, userId: string) => {
    await leaveRoomAction(roomId, userId);
  };

  const handleAddUser = async (roomId: number, userId: string) => {
    await declineRoomInvitationAction(roomId, userId);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {userMemberRooms.map(async (room) => (
        <RoomCard
          id={room.id}
          key={room.id}
          title={room.name}
          badges={await getRoomUsersNames(room.id)}
          handleLeave={() => handleLeave(room.id, userId)}
          handleAddUser={() => handleAddUser(room.id, userId)}
        />
      ))}
    </div>
  );
};
