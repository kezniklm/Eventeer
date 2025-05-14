import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

import { db } from "@/db";
import { roomActivity, subtask, task } from "@/db/schema/activity";

export type Subtask = { id: number; fk_task: number | null; is_done: boolean | null; name: string };

export const getSubTaskById = async (subtaskId: number) =>
  await db
    .select()
    .from(subtask)
    .innerJoin(task, eq(subtask.fk_task, task.id))
    .innerJoin(roomActivity, eq(task.id, roomActivity.fk_task))
    .where(eq(subtask.id, subtaskId));

export const getSubtasksByTask = async (taskId: number): Promise<Subtask[]> => {
  "use cache";
  cacheTag("room-details", "activities", "task", "subtask");

  return await db
    .select({
      id: subtask.id,
      fk_task: subtask.fk_task,
      is_done: subtask.is_done,
      name: subtask.name
    })
    .from(subtask)
    .where(eq(subtask.fk_task, taskId));
};

export const updateSubtaskIsDone = async (subtaskId: number, isDone: boolean) => {
  await db.update(subtask).set({ is_done: isDone }).where(eq(subtask.id, subtaskId));
};

export const deleteSubTask = async (subtaskId: number) => {
  await db.transaction(async (tx) => {
    const subTaskRows = await tx.delete(subtask).where(eq(subtask.id, subtaskId));

    if (subTaskRows.rowsAffected === 0) {
      throw new Error("Failed to delete task!");
    }
  });
};
