"use server";

import { revalidateTag } from "next/cache";

import { auth, getCurrentUser } from "@/auth";
import { type CreateEventSchema, type EventForm, eventFormSchema, eventSelectSchema } from "@/db/zod/event";
import { createEvent, deleteEvent, getEventById, updateEvent } from "@/repository/event";
import { isUserInRoom } from "@/repository/room";

export const createEventAction = async (eventData: EventForm, roomId: number) => {
  const { users, ...formData } = await eventFormSchema.parseAsync(eventData);

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to create event activity!");
  }

  const authorId = session.user.id;

  if (!isUserInRoom(roomId, authorId)) {
    throw new Error("You are not allowed to create events in this room!");
  }

  const insertData: CreateEventSchema = {
    ...formData,
    roomId,
    created_by: authorId
  };

  revalidateTag("activities");

  return await createEvent(insertData, users);
};

export const updateEventAction = async (eventData: EventForm, eventId: number, roomId: number) => {
  const { users, ...formData } = eventFormSchema.parse(eventData);

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to update event activity!");
  }

  const authorId = session.user.id;

  if (!isUserInRoom(roomId, authorId)) {
    throw new Error("You are not allowed to update events in this room!");
  }

  const insertData: CreateEventSchema = {
    ...formData,
    roomId,
    created_by: authorId
  };

  revalidateTag("activities");

  return updateEvent(insertData, eventId, users);
};

export const deleteEventAction = async (eventId: number) => {
  const { id } = await eventSelectSchema.pick({ id: true }).parseAsync({ id: eventId });
  const user = await getCurrentUser();

  const [event] = await getEventById(id);

  if (event.room_activity.created_by !== user.id) {
    throw new Error("Only author can remove the Event up!");
  }

  await deleteEvent(id);

  revalidateTag("activities");
};
