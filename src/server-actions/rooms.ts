"use server";

import { revalidatePath } from "next/cache";

import { createUserHasRoom, deleteUserHasRoom, updateUserHasRoom } from "@/repository/rooms";

export const leaveRoomAction = async (roomId: number, userId: string) => {
  await deleteUserHasRoom(roomId, userId);
  revalidatePath("/rooms");
};

export const acceptRoomInvitationAction = async (roomId: number, userId: string) => {
  await updateUserHasRoom(roomId, userId, true);
  revalidatePath("/rooms");
};

export const declineRoomInvitationAction = async (roomId: number, userId: string) => {
  await deleteUserHasRoom(roomId, userId);
  revalidatePath("/rooms");
};

export const inviteUserToRoomAction = async (roomId: number, userId: string) => {
  await createUserHasRoom(roomId, userId);
  revalidatePath("/rooms");
};
