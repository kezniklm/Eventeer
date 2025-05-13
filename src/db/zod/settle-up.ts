import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { settleUp } from "../schema/activity";

import { commonFormSchema, commonInsertSchema } from "./activity";
import { userIdNamePair } from "./user";

export const settleUpSelectSchema = createSelectSchema(settleUp);
export type SettleUpSelectSchema = z.infer<typeof settleUpSelectSchema>;

export const settleUpInsertSchema = createInsertSchema(settleUp).omit({ id: true }).merge(commonInsertSchema);
export type SettleUpInsertSchema = z.infer<typeof settleUpInsertSchema>;

const { money, ...rest } = settleUpInsertSchema
  .pick({
    money: true
  })
  .extend({ users: z.array(userIdNamePair).optional() })
  .merge(commonFormSchema).shape;

export const settleUpFormSchema = z.object({
  ...rest,
  money: money.nonnegative()
});

export type SettleUpForm = z.infer<typeof settleUpFormSchema>;
