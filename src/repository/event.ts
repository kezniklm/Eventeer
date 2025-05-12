import { eq } from "drizzle-orm";

import { db } from "@/db";
import { event, roomActivity } from "@/db/schema/activity";
import { type CreateEventSchema } from "@/db/zod/event";

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
      repeatableType: roomActivity.repeatableType,
      repeatableValue: roomActivity.repeatableValue,
      createdAt: roomActivity.createdAt,
      place: event.place
    })
    .from(roomActivity)
    .innerJoin(event, eq(event.id, roomActivity.fk_event))
    .where(eq(roomActivity.fk_room, roomId));

export const createEvent = async (data: CreateEventSchema) => {
  const [insertedEvent] = await db
    .insert(event)
    .values({
      roomId: data.roomId,
      place: data.place
    })
    .returning();

  const [insertedActivity] = await db.insert(roomActivity).values(data).returning();

  return { ...insertedEvent, activityId: insertedActivity.id };
};
