import { eq } from "drizzle-orm";

import { db } from "@/db";
import { event, roomActivity, type periodEnum } from "@/db/schema/activity";

export type CreateEventInput = {
  roomId: number;
  name: string;
  description?: string;
  authorId: string;
  dateTime: Date;
  priority: number;
  isPublic: boolean;
  repeatableType?: (typeof periodEnum)[number];
  repeatableValue?: number | null;
  place?: string;
};

export const getEventsByRoom = async (roomId: number) =>
  await db
    .select({
      activityId: roomActivity.id,
      name: roomActivity.name,
      description: roomActivity.description,
      isPublic: roomActivity.isPublic,
      priority: roomActivity.priority,
      authorId: roomActivity.created_by,
      timestamp: roomActivity.timestamp,
      repeatableType: roomActivity.repeatable_type,
      repeatableValue: roomActivity.repeatable_value,
      createdAt: roomActivity.createdAt,
      place: event.place
    })
    .from(roomActivity)
    .innerJoin(event, eq(event.id, roomActivity.fk_event))
    .where(eq(roomActivity.fk_room, roomId));

export const createEvent = async (data: CreateEventInput) => {
  const [insertedEvent] = await db
    .insert(event)
    .values({
      roomId: data.roomId,
      place: data.place
    })
    .returning();

  const activityData: typeof roomActivity.$inferInsert = {
    fk_room: data.roomId,
    fk_event: insertedEvent.id,
    name: data.name,
    description: data.description,
    isPublic: data.isPublic,
    priority: data.priority,
    created_by: data.authorId,
    timestamp: data.dateTime,
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

  return { ...insertedEvent, activityId: insertedActivity.id };
};
