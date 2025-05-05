import { auth } from "@/auth";
import { getMemberRoomsForUser, getRoomUsersNames } from "@/repository/rooms";

import { RoomCardWrapper } from "./user-rooms-card-wrapper";

export const UserRooms = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const userMemberRooms = await getMemberRoomsForUser(userId);

  if (userMemberRooms.length === 0) {
    return null;
  }

  const roomsWithBadges = await Promise.all(
    userMemberRooms.map(async (room) => {
      const usersNames = await getRoomUsersNames(room.id);

      const sortedBadges = userId
        ? [
            ...usersNames.filter((usersName) => usersName.id === userId),
            ...usersNames.filter((usersName) => usersName.id !== userId)
          ]
        : usersNames;

      return {
        room,
        badges: sortedBadges.map((r) => r.name).filter((name): name is string => name !== null)
      };
    })
  );

  return (
    <div className="space-y-6">
      <h1 className="text-center text-6xl">Rooms</h1>
      <div className="grid grid-cols-1 gap-6">
        {roomsWithBadges.map(({ room, badges }) => (
          <RoomCardWrapper key={room.id} room={room} userId={userId} badges={badges} />
        ))}
      </div>
    </div>
  );
};
