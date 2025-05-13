"use server";

import { revalidatePath } from "next/cache";

import { toggleAttendance } from "@/repository/attendance";

export const toggleAttendanceAction = async (userId: string, activityId: number, attend: boolean) => {
  await toggleAttendance(userId, activityId, attend);
  revalidatePath("/rooms");
};
