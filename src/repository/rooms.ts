import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema/auth";
import { room, userHasRoom } from "@/db/schema/room";
import { type RoomInsertSchema } from "@/db/zod/room";

export const insertRoom = async (data: RoomInsertSchema) => {
  const insertedRoom = await db.insert(room).values(data).returning();
  return insertedRoom[0];
};

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

export const getRoomUsersNames = async (roomId: number) =>
  await db
    .select({
      id: users.id,
      name: users.name
    })
    .from(users)
    .innerJoin(userHasRoom, eq(userHasRoom.user_id, users.id))
    .where(and(eq(userHasRoom.room_id, roomId), eq(userHasRoom.invitation_state, true)));

export const createUserHasRoomOnRoomCreate = async (roomId: number, userId: string) => {
  const insertedUserHasRoom = await db
    .insert(userHasRoom)
    .values({ room_id: roomId, user_id: userId, invitation_state: true })
    .returning();

  return insertedUserHasRoom[0];
};

export const createUserHasRoomOnUserInvite = async (roomId: number, userEmail: string) => {
  await db.transaction(async () => {
    const userResult = await db.select({ id: users.id }).from(users).where(eq(users.email, userEmail));

    if (userResult.length === 0) {
      throw new Error("User with the provided email does not exist.");
    }

    const userId = userResult[0].id;

    const existingInvitation = await db
      .select()
      .from(userHasRoom)
      .where(
        and(eq(userHasRoom.room_id, roomId), eq(userHasRoom.user_id, userId), eq(userHasRoom.invitation_state, false))
      );

    if (existingInvitation.length > 0) {
      throw new Error("User has already been invited to this room.");
    }

    await db.insert(userHasRoom).values({
      user_id: userId,
      room_id: roomId
    });
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
