import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

import { settleUp } from "../schema/activity";

export const createSettleUpSchema = createInsertSchema(settleUp);
export type CreateSettleUp = z.infer<typeof createSettleUpSchema>;

export const settleUpFormSchema = createSettleUpSchema.pick({
  description: true,
  isPublic: true,
  priority: true,
  name: true
});
export type SettleUpForm = z.infer<typeof settleUpFormSchema>;
