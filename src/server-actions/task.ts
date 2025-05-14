"use server";

import { revalidatePath } from "next/cache";

import { auth, getCurrentUser } from "@/auth";
import { isUserInRoom } from "@/repository/room";
import { type TaskForm, taskFormSchema, type TaskInsertSchema, taskSelectSchema } from "@/db/zod/task";
import { createTask, deleteTask, getTaskById, updateTask } from "@/repository/task";
import { deleteSubTask, getSubTaskById } from "@/repository/subtask";

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

  revalidatePath("/rooms"); //TAG

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

  revalidatePath("/rooms"); //TAG

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

  revalidatePath("/rooms"); //TAG
};

export const deleteSubTaskAction = async (subtaskId: number) => {
  const { id } = await taskSelectSchema.pick({ id: true }).parseAsync({ id: subtaskId });
  const user = await getCurrentUser();

  const [subTask] = await getSubTaskById(id);

  if (subTask.room_activity.created_by !== user.id) {
    throw new Error("Only author can remove the Settle up!");
  }

  await deleteSubTask(id);

  revalidatePath("/rooms"); //TAG
};
