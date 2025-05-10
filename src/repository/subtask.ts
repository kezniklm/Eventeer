import { eq } from "drizzle-orm";

import { db } from "@/db";
import { subtask } from "@/db/schema/activity";

export type Subtask = { id: number; fk_task: number | null; is_done: boolean | null; name: string };

export const getSubtasksByTask = async (taskId: number): Promise<Subtask[]> =>
  await db
    .select({
      id: subtask.id,
      fk_task: subtask.fk_task,
      is_done: subtask.is_done,
      name: subtask.name
    })
    .from(subtask)
    .where(eq(subtask.fk_task, taskId));

export const updateSubtaskIsDone = async (subtaskId: number, isDone: boolean) => {
  await db.update(subtask).set({ is_done: isDone }).where(eq(subtask.id, subtaskId));
};
