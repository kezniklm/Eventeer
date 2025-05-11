import { eq } from "drizzle-orm";

import { db } from "@/db";
import { settleUp } from "@/db/schema/activity";

export type CreateSettleUpInput = {
  roomId: number;
  name: string;
  description?: string;
  authorId: string;
  date: Date;
  money: number;
  priority: number;
  isPublic: boolean;
};

export const getSettleUpsByRoom = async (roomId: number) =>
  await db.select().from(settleUp).where(eq(settleUp.roomId, roomId));

export const createSettleUp = async (data: CreateSettleUpInput) => {
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
