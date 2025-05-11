import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { settleUp } from "../schema/activity";

import { userIdNamePair } from "./user";

export const settleUpInsertSchema = createInsertSchema(settleUp).omit({ id: true });
export type SettleUpInsertSchema = z.infer<typeof settleUpInsertSchema>;

export const settleUpFormSchema = settleUpInsertSchema
  .pick({
    description: true,
    isPublic: true,
    priority: true,
    name: true
  })
  .extend({ users: z.array(userIdNamePair) });
export type SettleUpForm = z.infer<typeof settleUpFormSchema>;
