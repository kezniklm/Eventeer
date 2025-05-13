import { useMutation } from "@tanstack/react-query";

import { createEventAction, deleteEventAction, updateEventAction } from "@/server-actions/event";
import { type EventForm } from "@/db/zod/event";

export const useCreateEventMutation = () =>
  useMutation({
    mutationFn: async ({ roomId, data }: { roomId: number; data: EventForm }) => await createEventAction(data, roomId)
  });

export const useUpdateEventMutation = () =>
  useMutation({
    mutationFn: async ({ eventId, data, roomId }: { eventId: number; data: EventForm; roomId: number }) =>
      updateEventAction(data, eventId, roomId)
  });

export const useDeleteEventMutation = () =>
  useMutation({
    mutationFn: async ({ eventId }: { eventId: number }) => await deleteEventAction(eventId)
  });
