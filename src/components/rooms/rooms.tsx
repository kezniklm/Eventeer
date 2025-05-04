import { auth } from "@/auth";
import { getMemberRoomsForUser, getRoomUsersNames } from "@/repository/rooms";
import { declineRoomInvitationAction, leaveRoomAction } from "@/server-actions/rooms";

import { RoomCard } from "./room-card";

export const Rooms = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    return;
  }

  const userMemberRooms = await getMemberRoomsForUser("1");

  const handleLeave = async (roomId: number, userId: string) => {
    try {
      await leaveRoomAction(roomId, userId);
      return true;
    } catch (err) {
      console.error("Failed to leave room", err);
      return false;
    }
  };

  const handleAddUser = async (roomId: number, userId: string) => {
    try {
      await declineRoomInvitationAction(roomId, userId);
      return true;
    } catch (err) {
      console.error("Failed to decline invitation", err);
      return false;
    }
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
