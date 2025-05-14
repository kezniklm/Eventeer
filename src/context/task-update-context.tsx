"use client";

import { createContext, useContext } from "react";

import { type TaskForm } from "@/db/zod/task";

type UpdateContext = {
  taskId: number;
  data: TaskForm;
};

const TaskUpdateContext = createContext<UpdateContext | null>(null);

export const useUpdateTaskContext = () => useContext(TaskUpdateContext);

export const TaskUpdateProvider = ({
  children,
  taskId,
  data
}: {
  children: React.ReactNode;
  taskId: UpdateContext["taskId"];
  data: TaskForm;
}) => <TaskUpdateContext.Provider value={{ taskId, data }}>{children}</TaskUpdateContext.Provider>;
