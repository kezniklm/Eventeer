"use server";

import { revalidatePath } from "next/cache";

import { auth, getCurrentUser } from "@/auth";
import {
  type SettleUpForm,
  settleUpFormSchema,
  type SettleUpInsertSchema,
  settleUpSelectSchema
} from "@/db/zod/settle-up";
import { isUserInRoom } from "@/repository/room";
import { createSettleUp, deleteSettleUp, getSettleUpById, updateSettleUp } from "@/repository/settleup";

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
    created_by: authorId
  };

  revalidatePath("/rooms");
  return createSettleUp(insertData, users);
};

export const updateSettleUpAction = async (settleUpData: SettleUpForm, settleUpId: number, roomId: number) => {
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
    created_by: authorId
  };

  revalidatePath("/rooms");

  return updateSettleUp(insertData, users, settleUpId);
};

export const deleteSettleUpAction = async (settleUpId: number) => {
  const { id } = await settleUpSelectSchema.pick({ id: true }).parseAsync({ id: settleUpId });
  const user = await getCurrentUser();

  const [settleUp] = await getSettleUpById(id);

  if (settleUp.room_activity.created_by !== user.id) {
    throw new Error("Only author can remove the Settle up!");
  }

  await deleteSettleUp(id);
  revalidatePath("/rooms");
};
