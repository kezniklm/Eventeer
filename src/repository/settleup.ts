import { eq } from "drizzle-orm";

import { db } from "@/db";
import { settleUp, roomActivity } from "@/db/schema/activity";
import { type periodEnum } from "@/db/schema/activity";

export type CreateSettleUpInput = {
  roomId: number;
  name: string;
  description?: string;
  authorId: string;
  date: Date;
  money: number;
  priority: number;
  isPublic: boolean;
  repeatableType?: (typeof periodEnum)[number];
  repeatableValue?: number | null;
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
      timestamp: roomActivity.timestamp,
      createdAt: roomActivity.createdAt,
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
      money: data.money
    })
    .returning();

  const activityData: typeof roomActivity.$inferInsert = {
    fk_room: data.roomId,
    fk_settle_up: insertedSU.id,
    name: data.name,
    description: data.description,
    isPublic: data.isPublic,
    priority: data.priority,
    created_by: data.authorId,
    timestamp: data.date,
    createdAt: new Date(),
    repeatable_type: null,
    repeatable_value: null
  };

  if (data.repeatableType) {
    activityData.repeatable_type = data.repeatableType;
  }
  if (data.repeatableValue !== null) {
    activityData.repeatable_value = data.repeatableValue;
  }

  const [insertedActivity] = await db.insert(roomActivity).values(activityData).returning();

  return { ...insertedSU, activityId: insertedActivity.id };
};
