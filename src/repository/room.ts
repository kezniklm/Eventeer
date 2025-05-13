import { eq, and } from "drizzle-orm";

import { db } from "@/db";
import { room, userHasRoom } from "@/db/schema/room";
import type { RoomInsertSchema } from "@/db/zod/room";

export const getRoomByLink = async (link: string) =>
  await db
    .select({ id: room.id, name: room.name, description: room.description })
    .from(room)
    .where(eq(room.link, link))
    .get();

export const isUserInRoom = async (roomId: number, userId: string): Promise<boolean> => {
  const membership = await db
    .select()
    .from(userHasRoom)
    .where(and(eq(userHasRoom.room_id, roomId), eq(userHasRoom.user_id, userId)))
    .get();

  return membership !== undefined;
};

export const insertRoom = async (data: RoomInsertSchema) => {
  const roomT = await db.insert(room).values(data).returning();
  return roomT[0];
};

export const insertUserHasRoom = async (roomId: number, userId: string) => {
  const roomT = await db
    .insert(userHasRoom)
    .values({ room_id: roomId, user_id: userId, invitation_state: true })
    .returning();
  return roomT[0];
};
