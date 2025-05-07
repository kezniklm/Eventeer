import { eq } from "drizzle-orm";

import { db } from "@/db";
import { room } from "@/db/schema/room";

export const getRoomById = async (id: string) =>
  db
    .select({ name: room.name, description: room.description })
    .from(room)
    .where(eq(room.id, Number(id)))
    .get();
