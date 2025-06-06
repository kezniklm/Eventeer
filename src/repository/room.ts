import { eq, and } from "drizzle-orm";

import { db } from "@/db";
import { room, userHasRoom } from "@/db/schema/room";

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
