import { eq } from "drizzle-orm";

import { db } from "@/db";
import { settleUp, roomActivity } from "@/db/schema/activity";

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
  await db
    .select({
      activityId: roomActivity.id,
      name: roomActivity.name,
      description: roomActivity.description,
      isPublic: roomActivity.isPublic,
      priority: roomActivity.priority,
      authorId: roomActivity.created_by,
      date: settleUp.date,
      money: settleUp.money
    })
    .from(roomActivity)
    .innerJoin(settleUp, eq(settleUp.id, roomActivity.fk_settle_up))
    .where(eq(roomActivity.fk_room, roomId));

export const createSettleUp = async (data: CreateSettleUpInput) => {
  const [insertedSU] = await db
    .insert(settleUp)
    .values({
      roomId: data.roomId,
      date: data.date,
      money: data.money
    })
    .returning();
  const [insertedActivity] = await db
    .insert(roomActivity)
    .values({
      fk_room: data.roomId,
      fk_settle_up: insertedSU.id,
      name: data.name,
      description: data.description,
      isPublic: data.isPublic,
      priority: data.priority,
      created_by: data.authorId
    })
    .returning();

  return { ...insertedSU, activityId: insertedActivity.id };
};
