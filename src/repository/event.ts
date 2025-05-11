import { eq } from "drizzle-orm";

import { db } from "@/db";
import { event, roomActivity } from "@/db/schema/activity";

export type CreateEventInput = {
  roomId: number;
  name: string;
  description?: string;
  authorId: string;
  dateTime: Date;
  priority: number;
  isPublic: boolean;
  repeatableType?: string;
  repeatableValue?: number;
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
      dateTime: event.dateTime,
      place: event.place,
      repeatableType: event.repeatableType,
      repeatableValue: event.repeatableValue
    })
    .from(roomActivity)
    .innerJoin(event, eq(event.id, roomActivity.fk_event))
    .where(eq(roomActivity.fk_room, roomId));

export const createEvent = async (data: CreateEventInput) => {
  const [insertedEvent] = await db
    .insert(event)
    .values({
      roomId: data.roomId,
      dateTime: data.dateTime,
      repeatableType: data.repeatableType,
      repeatableValue: data.repeatableValue,
      place: data.place
    })
    .returning();
  const [insertedActivity] = await db
    .insert(roomActivity)
    .values({
      fk_room: data.roomId,
      fk_event: insertedEvent.id,
      name: data.name,
      description: data.description,
      isPublic: data.isPublic,
      priority: data.priority,
      created_by: data.authorId
    })
    .returning();

  return { ...insertedEvent, activityId: insertedActivity.id };
};
