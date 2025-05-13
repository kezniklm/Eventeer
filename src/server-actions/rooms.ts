"use server";

import { revalidatePath } from "next/cache";

import {
  createUserHasRoomOnRoomCreate,
  createUserHasRoomOnUserInvite,
  deleteUserHasRoom,
  insertRoom,
  updateUserHasRoom
} from "@/repository/rooms";
import type { RoomInsertSchema } from "@/db/zod/room";

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

export const inviteUserToRoomAction = async (roomId: number, email: string) => {
  await createUserHasRoomOnUserInvite(roomId, email);
  revalidatePath("/rooms");
};

export const insertRoomAction = async (data: RoomInsertSchema) => {
  const insertedRoom = await insertRoom(data);
  await createUserHasRoomOnRoomCreate(insertedRoom.id, insertedRoom.owner);
  revalidatePath("/rooms");
  return insertedRoom;
};
