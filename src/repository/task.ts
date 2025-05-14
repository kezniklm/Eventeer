import { eq } from "drizzle-orm";

import { db } from "@/db";
import { roomActivity, subtask, task, userHasActivity } from "@/db/schema/activity";
import { type TaskInsertSchema } from "@/db/zod/task";
import { type UserIdNamePair } from "@/db/zod/user";

export const getTaskById = async (taskId: number) =>
  await db.select().from(task).innerJoin(roomActivity, eq(roomActivity.id, taskId)).where(eq(task.id, taskId));

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

export const createTask = async (data: TaskInsertSchema, users?: UserIdNamePair[]) =>
  await db.transaction(async (tx) => {
    const [insertedTask] = await db
      .insert(task)
      .values({
        roomId: data.roomId,
        dateTime: data.dateTime
      })
      .returning();

    await db
      .insert(subtask)
      .values(
        data.taskNames.map((name) => ({
          fk_task: insertedTask.id,
          name: name.name,
          is_done: false
        }))
      )
      .returning();

    const [insertedActivity] = await tx
      .insert(roomActivity)
      .values({
        fk_task: insertedTask.id,
        name: data.name,
        description: data.description,
        created_by: data.created_by,
        fk_room: data.roomId,
        priority: data.priority,
        isPublic: data.isPublic,
        repeatableType: data.repeatableType,
        repeatableValue: data.repeatableValue
      })
      .returning();

    if (users && users.length !== 0) {
      const taskUsers = users.map((user) => ({ fk_user_id: user.id, fk_activity_id: insertedActivity.id }));
      await tx.insert(userHasActivity).values([...taskUsers]);
    }

    return { ...insertedTask, ...insertedActivity };
  });

export const updateTask = async (data: TaskInsertSchema, taskId: number, users?: UserIdNamePair[]) =>
  db.transaction(async (tx) => {
    const [updatedTask] = await tx
      .update(task)
      .set({
        roomId: data.roomId,
        dateTime: data.dateTime
      })
      .where(eq(task.id, taskId))
      .returning();

    const newSubtasks = data.taskNames.filter((sub) => !sub.dbId);

    const existingSubtasks = data.taskNames.filter((sub) => sub.dbId);

    if (newSubtasks.length) {
      await tx.insert(subtask).values(
        newSubtasks.map((sub) => ({
          fk_task: taskId,
          name: sub.name,
          is_done: false
        }))
      );
    }

    if (existingSubtasks.length) {
      const updatePromises = existingSubtasks.map(async (sub) => {
        const existing = await tx.select().from(subtask).where(eq(subtask.id, sub.dbId!)).limit(1);

        if (existing.length > 0) {
          await tx.update(subtask).set({ name: sub.name }).where(eq(subtask.id, sub.dbId!));
        }
      });

      await Promise.all(updatePromises);
    }

    const [activity] = await tx.update(roomActivity).set(data).where(eq(roomActivity.fk_task, taskId)).returning();

    await tx.delete(userHasActivity).where(eq(userHasActivity.fk_activity_id, activity.id));

    if (users && users?.length !== 0) {
      const usersWithTask = users?.map((user) => ({ fk_user_id: user.id, fk_activity_id: activity.id }));
      await tx.insert(userHasActivity).values([...usersWithTask]);
    }

    return { ...updatedTask, ...activity };
  });

export const deleteTask = async (taskId: number) => {
  await db.transaction(async (tx) => {
    const activityRows = await tx.delete(roomActivity).where(eq(roomActivity.fk_task, taskId));

    if (activityRows.rowsAffected !== 1) {
      throw new Error("Failed to delete task!");
    }

    const subTaskRows = await tx.delete(subtask).where(eq(subtask.fk_task, taskId));

    if (subTaskRows.rowsAffected === 0) {
      throw new Error("Failed to delete task!");
    }

    const taskRows = await tx.delete(task).where(eq(task.id, taskId));

    if (taskRows.rowsAffected !== 1) {
      throw new Error("Failed to delete task!");
    }
  });
};
