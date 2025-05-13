"use client";

import { type User } from "next-auth";
import { toast } from "sonner";

import PopupForm from "@/components/pop-up-form";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { useDeleteEventMutation } from "@/hooks/mutations/event";
import { EventUpdateProvider } from "@/context/event-update-context";
import { type EventForm } from "@/db/zod/event";

import { CardActionsWrapper } from "../card-actions-wrapper";
import { UpdateButton } from "../update-button";

type Props = {
  forUpdateData: EventForm;
  eventId: number;
  userId?: string;
  author?: User;
};

export const EventCardControls = ({ forUpdateData, eventId, userId, author }: Props) => {
  const deleteMutation = useDeleteEventMutation();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(
      { eventId },
      {
        onSuccess: () => toast.success(`Successfully deleted!`),
        onError: () => toast.error("Failed to delete event activity!")
      }
    );
  };

  return (
    <CardActionsWrapper>
      <EventUpdateProvider data={forUpdateData} eventId={eventId}>
        <PopupForm type="event">
          <UpdateButton />
        </PopupForm>
      </EventUpdateProvider>
      {userId === author?.id && <DeleteDialog subject="Event" onConfirm={async () => await handleDelete()} />}
    </CardActionsWrapper>
  );
};
