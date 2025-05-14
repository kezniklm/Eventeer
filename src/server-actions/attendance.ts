"use server";

import { revalidateTag } from "next/cache";

import { toggleAttendance } from "@/repository/attendance";

export const toggleAttendanceAction = async (userId: string, activityId: number, attend: boolean) => {
  await toggleAttendance(userId, activityId, attend);
  revalidateTag("activities");
};
