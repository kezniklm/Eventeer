"use server";
import { revalidatePath } from "next/cache";

import { updateSubtaskIsDone } from "@/repository/subtask";

export const toggleSubtaskAction = async (subtaskId: number, isDone: boolean) => {
  await updateSubtaskIsDone(subtaskId, isDone);
  revalidatePath("/rooms");
};
