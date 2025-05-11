import { eq } from "drizzle-orm";

import { db } from "@/db";
import { task } from "@/db/schema/activity";

export type CreateTaskInput = {
  roomId: number;
  name: string;
  description?: string;
  authorId: string;
  dueDate: Date;
  priority: number;
  isPublic: boolean;
};

export const getTasksByRoom = async (roomId: number) => await db.select().from(task).where(eq(task.roomId, roomId));

export const createTask = async (data: CreateTaskInput) => {
  const [inserted] = await db
    .insert(task)
    .values({
      roomId: data.roomId,
      name: data.name,
      description: data.description,
      authorId: data.authorId,
      due_date: data.dueDate,
      priority: data.priority,
      isPublic: data.isPublic
    })
    .returning();
  return inserted;
};
