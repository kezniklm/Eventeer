import { useMutation } from "@tanstack/react-query";

import { type TaskForm } from "@/db/zod/task";
import { createTaskAction, deleteSubTaskAction, deleteTaskAction, updateTaskAction } from "@/server-actions/task";

export const useCreateTaskMutation = () =>
  useMutation({
    mutationFn: async ({ roomId, data }: { roomId: number; data: TaskForm }) => await createTaskAction(data, roomId)
  });

export const useUpdateTaskMutation = () =>
  useMutation({
    mutationFn: async ({ taskId, data, roomId }: { taskId: number; data: TaskForm; roomId: number }) =>
      updateTaskAction(data, taskId, roomId)
  });

export const useDeleteTaskMutation = () =>
  useMutation({
    mutationFn: async ({ taskId }: { taskId: number }) => await deleteTaskAction(taskId)
  });

export const useDeleteSubTaskMutation = () =>
  useMutation({
    mutationFn: async (subtaskId: number) => await deleteSubTaskAction(subtaskId)
  });
