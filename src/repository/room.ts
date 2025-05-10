import { eq } from "drizzle-orm";

import { db } from "@/db";
import { room } from "@/db/schema/room";

export const getRoomByLink = async (link: string) =>
  await db
    .select({ id: room.id, name: room.name, description: room.description })
    .from(room)
    .where(eq(room.link, link))
    .get();
