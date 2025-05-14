"use client";

import { type User } from "next-auth";
import { toast } from "sonner";

import PopupForm from "@/components/pop-up-form";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { useDeleteTaskMutation } from "@/hooks/mutations/task";
import { type TaskForm } from "@/db/zod/task";
import { TaskUpdateProvider } from "@/context/task-update-context";

import { CardActionsWrapper } from "../card-actions-wrapper";
import { UpdateButton } from "../update-button";

type Props = {
  forUpdateData: TaskForm;
  taskId: number;
  userId?: string;
  author?: User;
};

export const TaskCardControls = ({ forUpdateData, taskId, userId, author }: Props) => {
  const deleteMutation = useDeleteTaskMutation();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(
      { taskId },
      {
        onSuccess: () => toast.success(`Successfully deleted!`),
        onError: () => toast.error("Failed to delete task activity!")
      }
    );
  };

  return (
    <CardActionsWrapper>
      <TaskUpdateProvider data={forUpdateData} taskId={taskId}>
        <PopupForm type="task">
          <UpdateButton />
        </PopupForm>
      </TaskUpdateProvider>
      {userId === author?.id && <DeleteDialog subject="Task" onConfirm={async () => await handleDelete()} />}
    </CardActionsWrapper>
  );
};
