import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { settleUp } from "../schema/activity";

import { commonFormSchema } from "./activity";
import { userIdNamePair } from "./user";

export const settleUpInsertSchema = createInsertSchema(settleUp).omit({ id: true });
export type SettleUpInsertSchema = z.infer<typeof settleUpInsertSchema>;

export const settleUpFormSchema = settleUpInsertSchema
  .pick({
    isPublic: true,
    priority: true,
    money: true
  })
  .extend({ users: z.array(userIdNamePair) })
  .and(commonFormSchema);
export type SettleUpForm = z.infer<typeof settleUpFormSchema>;
