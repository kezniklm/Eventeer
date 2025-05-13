"use server";

import { revalidatePath } from "next/cache";

import { auth, getCurrentUser } from "@/auth";
import { isUserInRoom } from "@/repository/room";
import { createEvent, deleteEvent, getEventById, updateEvent } from "@/repository/event";
import { type CreateEventSchema, type EventForm, eventFormSchema, eventSelectSchema } from "@/db/zod/event";

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

  revalidatePath("/rooms");

  return await createEvent(insertData, users);
};

export const updateEventAction = async (eventData: EventForm, eventId: number, roomId: number) => {
  const { users, ...formData } = eventFormSchema.parse(eventData);

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to create settle up activity!");
  }

  const authorId = session.user.id;

  if (!isUserInRoom(roomId, authorId)) {
    throw new Error("You are not allowed to create settle ups in this room!");
  }

  const insertData: CreateEventSchema = {
    ...formData,
    roomId,
    created_by: authorId
  };

  revalidatePath("/rooms");

  return updateEvent(insertData, eventId, users);
};

export const deleteEventAction = async (settleUpId: number) => {
  const { id } = await eventSelectSchema.pick({ id: true }).parseAsync({ id: settleUpId });
  const user = await getCurrentUser();

  const [settleUp] = await getEventById(id);

  if (settleUp.room_activity.created_by !== user.id) {
    throw new Error("Only author can remove the Settle up!");
  }

  await deleteEvent(id);

  revalidatePath("/rooms");
};
