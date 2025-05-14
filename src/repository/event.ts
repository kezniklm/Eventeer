import { eq } from "drizzle-orm";

import { db } from "@/db";
import { event, roomActivity, userHasActivity } from "@/db/schema/activity";
import { type CreateEventSchema } from "@/db/zod/event";
import { type UserIdNamePair } from "@/db/zod/user";

export const getEventById = async (eventId: number) =>
  await db.select().from(event).innerJoin(roomActivity, eq(roomActivity.id, eventId)).where(eq(event.id, eventId));

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

export const createEvent = async (data: CreateEventSchema, users?: UserIdNamePair[]) =>
  await db.transaction(async (tx) => {
    const [insertedEvent] = await db
      .insert(event)
      .values({
        roomId: data.roomId,
        place: data.place,
        dateTime: data.dateTime
      })
      .returning();

    const [insertedActivity] = await tx
      .insert(roomActivity)
      .values({
        fk_event: insertedEvent.id,
        name: data.name,
        description: data.description,
        created_by: data.created_by,
        fk_room: data.roomId,
        priority: data.priority,
        isPublic: data.isPublic,
        repeatableType: data.repeatableType,
        repeatableValue: data.repeatableValue
      })
      .returning();

    if (users && users.length !== 0) {
      const eventUsers = users.map((user) => ({ fk_user_id: user.id, fk_activity_id: insertedActivity.id }));
      await tx.insert(userHasActivity).values([...eventUsers]);
    }

    return { ...insertedEvent, ...insertedActivity };
  });

export const updateEvent = async (data: CreateEventSchema, eventId: number, users?: UserIdNamePair[]) =>
  db.transaction(async (tx) => {
    console.log(eventId);
    const [updatedEvent] = await tx
      .update(event)
      .set({
        roomId: data.roomId,
        place: data.place,
        dateTime: data.dateTime
      })
      .where(eq(event.id, eventId))
      .returning();

    const [activity] = await tx.update(roomActivity).set(data).where(eq(roomActivity.fk_event, eventId)).returning();

    await tx.delete(userHasActivity).where(eq(userHasActivity.fk_activity_id, activity.id));

    if (users && users?.length !== 0) {
      const usersWithEvent = users?.map((user) => ({ fk_user_id: user.id, fk_activity_id: activity.id }));
      await tx.insert(userHasActivity).values([...usersWithEvent]);
    }

    return { ...updatedEvent, ...activity };
  });

export const deleteEvent = async (eventId: number) => {
  await db.transaction(async (tx) => {
    const activityRows = await tx.delete(roomActivity).where(eq(roomActivity.fk_event, eventId));

    if (activityRows.rowsAffected !== 1) {
      throw new Error("Failed to delete event!");
    }

    const eventRows = await tx.delete(event).where(eq(event.id, eventId));

    if (eventRows.rowsAffected !== 1) {
      throw new Error("Failed to delete event!");
    }
  });
};
