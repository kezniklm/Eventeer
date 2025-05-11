import { eq } from "drizzle-orm";

import { db } from "@/db";
import { event } from "@/db/schema/activity";
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

export const getEventsByRoom = async (roomId: number) => await db.select().from(event).where(eq(event.roomId, roomId));

export const createEvent = async (data: CreateEventInput) => {
  const [inserted] = await db
    .insert(event)
    .values({
      roomId: data.roomId,
      name: data.name,
      description: data.description,
      authorId: data.authorId,
      dateTime: data.dateTime,
      priority: data.priority,
      isPublic: data.isPublic,
      repeatableType: data.repeatableType,
      repeatableValue: data.repeatableValue,
      place: data.place
    })
    .returning();
  return inserted;
};
