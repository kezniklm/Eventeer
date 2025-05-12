import { useMutation } from "@tanstack/react-query";

import { type SettleUpForm } from "@/db/zod/settle-up";
import { createSettleUpAction } from "@/server-actions/settle-up";

export const useCreateSettleUpMutation = () =>
  useMutation({
    mutationFn: async ({ roomId, data }: { roomId: number; data: SettleUpForm }) =>
      await createSettleUpAction(data, roomId)
  });
