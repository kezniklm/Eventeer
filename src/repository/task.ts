import { eq } from "drizzle-orm";

import { db } from "@/db";
import { roomActivity, task } from "@/db/schema/activity";
import { type TaskInsertSchema } from "@/db/zod/task";

export const getTasksByRoom = async (roomId: number) =>
  await db
    .select({
      activityId: roomActivity.id,
      name: roomActivity.name,
      description: roomActivity.description,
      isPublic: roomActivity.isPublic,
      priority: roomActivity.priority,
      authorId: roomActivity.created_by,
      timestamp: roomActivity.timestamp,
      repeatableType: roomActivity.repeatableType,
      repeatableValue: roomActivity.repeatableValue,
      createdAt: roomActivity.createdAt
    })
    .from(roomActivity)
    .innerJoin(task, eq(task.id, roomActivity.fk_task))
    .where(eq(roomActivity.fk_room, roomId));

export const createTask = async (data: TaskInsertSchema) => {
  const [insertedTask] = await db.insert(task).values({ roomId: data.roomId }).returning();

  const [insertedActivity] = await db.insert(roomActivity).values(data).returning();

  return { insertedTask, activityId: insertedActivity.id };
};
