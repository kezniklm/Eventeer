import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema/auth";
import { room, userHasRoom } from "@/db/schema/room";

export const getMemberRoomsForUser = async (userId: string) => {
  const result = await db
    .select({ room })
    .from(room)
    .innerJoin(userHasRoom, eq(userHasRoom.room_id, room.id))
    .where(and(eq(userHasRoom.user_id, userId), eq(userHasRoom.invitation_state, true)));

  return result.map((r) => r.room);
};

export const getInvitedRoomsForUser = async (userId: string) => {
  const result = await db
    .select({ room })
    .from(room)
    .innerJoin(userHasRoom, eq(userHasRoom.room_id, room.id))
    .where(and(eq(userHasRoom.user_id, userId), eq(userHasRoom.invitation_state, false)));

  return result.map((r) => r.room);
};

export const getRoomUsersNames = async (roomId: number) => {
  const result = await db
    .select({
      name: users.name
    })
    .from(users)
    .innerJoin(userHasRoom, eq(userHasRoom.user_id, users.id))
    .where(eq(userHasRoom.room_id, roomId));

  return result.map((r) => r.name).filter((name): name is string => name !== null);
};

export const createUserHasRoom = async (roomId: number, userId: string) => {
  await db.insert(userHasRoom).values({
    user_id: userId,
    room_id: roomId
  });
};

export const deleteUserHasRoom = async (roomId: number, userId: string) => {
  await db.delete(userHasRoom).where(and(eq(userHasRoom.room_id, roomId), eq(userHasRoom.user_id, userId)));
};

export const updateUserHasRoom = async (roomId: number, userId: string, invitation_state: boolean) => {
  await db
    .update(userHasRoom)
    .set({ invitation_state })
    .where(and(eq(userHasRoom.room_id, roomId), eq(userHasRoom.user_id, userId)));
};
