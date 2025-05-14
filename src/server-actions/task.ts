"use server";

import { revalidateTag } from "next/cache";

import { auth, getCurrentUser } from "@/auth";
import { type TaskForm, taskFormSchema, type TaskInsertSchema, taskSelectSchema } from "@/db/zod/task";
import { isUserInRoom } from "@/repository/room";
import { deleteSubTask, getSubTaskById } from "@/repository/subtask";
import { createTask, deleteTask, getTaskById, updateTask } from "@/repository/task";

export const createTaskAction = async (taskData: TaskForm, roomId: number) => {
  const { users, ...formData } = await taskFormSchema.parseAsync(taskData);

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to create task activity!");
  }

  const authorId = session.user.id;

  if (!isUserInRoom(roomId, authorId)) {
    throw new Error("You are not allowed to create tasks in this room!");
  }

  const insertData: TaskInsertSchema = {
    ...formData,
    roomId,
    created_by: authorId
  };

  revalidateTag("activities");

  return await createTask(insertData, users);
};

export const updateTaskAction = async (taskData: TaskForm, taskId: number, roomId: number) => {
  const { users, ...formData } = taskFormSchema.parse(taskData);

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to create settle up activity!");
  }

  const authorId = session.user.id;

  if (!isUserInRoom(roomId, authorId)) {
    throw new Error("You are not allowed to create settle ups in this room!");
  }

  const insertData: TaskInsertSchema = {
    ...formData,
    roomId,
    created_by: authorId
  };

  revalidateTag("activities");

  return updateTask(insertData, taskId, users);
};

export const deleteTaskAction = async (taskId: number) => {
  const { id } = await taskSelectSchema.pick({ id: true }).parseAsync({ id: taskId });
  const user = await getCurrentUser();

  const [task] = await getTaskById(id);

  if (task.room_activity.created_by !== user.id) {
    throw new Error("Only author can remove the Settle up!");
  }

  await deleteTask(id);

  revalidateTag("activities");
};

export const deleteSubTaskAction = async (subtaskId: number) => {
  const { id } = await taskSelectSchema.pick({ id: true }).parseAsync({ id: subtaskId });
  const user = await getCurrentUser();

  const [subTask] = await getSubTaskById(id);

  if (subTask.room_activity.created_by !== user.id) {
    throw new Error("Only author can remove the Settle up!");
  }

  await deleteSubTask(id);

  revalidateTag("subtask");
};
