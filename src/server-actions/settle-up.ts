"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { type SettleUpForm, settleUpFormSchema, type SettleUpInsertSchema } from "@/db/zod/settle-up";
import { isUserInRoom } from "@/repository/room";
import { createSettleUp } from "@/repository/settleup";

export const createSettleUpAction = async (settleUpData: SettleUpForm, roomId: number) => {
  const { users, ...formData } = settleUpFormSchema.parse(settleUpData);
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to create settle up activity!");
  }
  const authorId = session.user.id;

  if (!isUserInRoom(roomId, authorId)) {
    throw new Error("You are not allowed to create settle ups in this room!");
  }

  const insertData: SettleUpInsertSchema = {
    ...formData,
    roomId,
    authorId
  };

  revalidatePath("/rooms");
  return createSettleUp(insertData, users);
};
