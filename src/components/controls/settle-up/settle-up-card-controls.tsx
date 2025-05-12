"use client";

import { type User } from "next-auth";
import { toast } from "sonner";

import PopupForm from "@/components/pop-up-form";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { SettleUpUpdateProvider } from "@/context/settle-up-update-context";
import { type SettleUpForm } from "@/db/zod/settle-up";
import { useDeleteSettleUpMutation } from "@/hooks/mutations/settle-up";

import { CardActionsWrapper } from "../card-actions-wrapper";
import { UpdateButton } from "../update-button";

type Props = {
  forUpdateData: SettleUpForm;
  settleUpId: number;
  userId?: string;
  author?: User;
};

export const SettleUpCardControls = ({ forUpdateData, settleUpId, userId, author }: Props) => {
  const deleteMutation = useDeleteSettleUpMutation();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(
      { settleUpId },
      {
        onSuccess: () => toast.success(`Successfully deleted!`),
        onError: () => toast.error("Failed to delete settle up activity!")
      }
    );
  };

  return (
    <CardActionsWrapper>
      <SettleUpUpdateProvider data={forUpdateData} settleUpId={settleUpId}>
        <PopupForm type="settleup">
          <UpdateButton />
        </PopupForm>
      </SettleUpUpdateProvider>
      {userId === author?.id && <DeleteDialog subject="Settle Up" onConfirm={async () => await handleDelete()} />}
    </CardActionsWrapper>
  );
};
