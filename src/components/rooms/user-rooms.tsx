import { auth } from "@/auth";
import { getMemberRoomsForUser, getRoomUsersNames } from "@/repository/rooms";

import { CreateRoomPopup } from "../room/create-room-popup";

import { RoomCardWrapper } from "./user-rooms-card-wrapper";

export const UserRooms = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return null;
  }

  const userId = user.id;
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
    <div className="m-auto space-y-6 lg:max-w-7xl">
      <div className="flex flex-row justify-between px-2">
        <h1 className="text-center text-6xl">Rooms</h1>
        <div className="space-x-10">
          <CreateRoomPopup user={user} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {roomsWithBadges.map(({ room, badges }) => (
          <RoomCardWrapper key={room.id} room={room} userId={userId} badges={badges} />
        ))}
      </div>
    </div>
  );
};
