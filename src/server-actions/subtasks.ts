"use server";
import { revalidateTag } from "next/cache";

import { updateSubtaskIsDone } from "@/repository/subtask";

export const toggleSubtaskAction = async (subtaskId: number, isDone: boolean) => {
  await updateSubtaskIsDone(subtaskId, isDone);
  revalidateTag("subtask");
};
