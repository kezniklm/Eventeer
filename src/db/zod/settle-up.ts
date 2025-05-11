import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

import { settleUp } from "../schema/activity";

export const settleUpInsertSchema = createInsertSchema(settleUp).omit({ id: true });
export type SettleUpInsertSchema = z.infer<typeof settleUpInsertSchema>;

export const settleUpFormSchema = settleUpInsertSchema.pick({
  description: true,
  isPublic: true,
  priority: true,
  name: true
});
export type SettleUpForm = z.infer<typeof settleUpFormSchema>;
