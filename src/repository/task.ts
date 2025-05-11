import { eq } from "drizzle-orm";

import { db } from "@/db";
import { task, roomActivity } from "@/db/schema/activity";

export type CreateTaskInput = {
  roomId: number;
  name: string;
  description?: string;
  authorId: string;
  dueDate: Date;
  priority: number;
  isPublic: boolean;
};

export const getTasksByRoom = async (roomId: number) =>
  await db
    .select({
      activityId: roomActivity.id,
      name: roomActivity.name,
      description: roomActivity.description,
      isPublic: roomActivity.isPublic,
      priority: roomActivity.priority,
      authorId: roomActivity.created_by,
      dueDate: task.due_date
    })
    .from(roomActivity)
    .innerJoin(task, eq(task.id, roomActivity.fk_task))
    .where(eq(roomActivity.fk_room, roomId));

export const createTask = async (data: CreateTaskInput) => {
  const [insertedTask] = await db
    .insert(task)
    .values({
      roomId: data.roomId,
      due_date: data.dueDate
    })
    .returning();
  const [insertedActivity] = await db
    .insert(roomActivity)
    .values({
      fk_room: data.roomId,
      fk_task: insertedTask.id,
      name: data.name,
      description: data.description,
      isPublic: data.isPublic,
      priority: data.priority,
      created_by: data.authorId
    })
    .returning();

  return { ...insertedTask, activityId: insertedActivity.id };
};
