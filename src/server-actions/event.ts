"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { createEventFormSchema, type CreateEventSchema, type CreateEventFormSchema } from "@/db/zod/event";
import { isUserInRoom } from "@/repository/room";
import { createEvent } from "@/repository/event";

export const createEventAction = async (eventData: CreateEventFormSchema, roomId: number) => {
  const { users, ...formData } = await createEventFormSchema.parseAsync(eventData);

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
    authorId
  };

  revalidatePath("/rooms");

  return await createEvent(insertData, users);
};
