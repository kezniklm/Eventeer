import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { settleUp } from "../schema/activity";

import { userIdNamePair } from "./user";

export const createSettleUpSchema = createInsertSchema(settleUp);
export type CreateSettleUp = z.infer<typeof createSettleUpSchema>;

export const settleUpFormSchema = createSettleUpSchema
  .pick({
    description: true,
    isPublic: true,
    priority: true,
    name: true
  })
  .extend({ users: z.array(userIdNamePair) }); // TODO:
export type SettleUpForm = z.infer<typeof settleUpFormSchema>;
