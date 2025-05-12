import { useMutation } from "@tanstack/react-query";

import { type CreateEventFormSchema } from "@/db/zod/event";
import { createEventAction } from "@/server-actions/event";

export const useCreateEventMutation = () =>
  useMutation({
    mutationFn: async ({ roomId, data }: { roomId: number; data: CreateEventFormSchema }) =>
      await createEventAction(data, roomId)
  });
