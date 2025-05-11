import { eq } from "drizzle-orm";

import { db } from "@/db";
import { settleUp } from "@/db/schema/activity";
import { type SettleUpInsertSchema } from "@/db/zod/settle-up";

export const getSettleUpsByRoom = async (roomId: number) =>
  await db.select().from(settleUp).where(eq(settleUp.roomId, roomId));

export const createSettleUp = async (data: SettleUpInsertSchema) => {
  const [inserted] = await db
    .insert(settleUp)
    .values({
      roomId: data.roomId,
      name: data.name,
      description: data.description,
      authorId: data.authorId,
      date: data.date,
      money: data.money,
      priority: data.priority,
      isPublic: data.isPublic
    })
    .returning();
  return inserted;
};
