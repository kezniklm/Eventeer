import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { settleUp } from "../schema/activity";

import { commonFormSchema, commonInsertSchema } from "./activity";
import { userIdNamePair } from "./user";

export const settleUpInsertSchema = createInsertSchema(settleUp)
  .omit({ id: true })
  .merge(commonInsertSchema)
  .omit({ repeatableType: true, repeatableValue: true }); // TODO
export type SettleUpInsertSchema = z.infer<typeof settleUpInsertSchema>;

export const settleUpFormSchema = settleUpInsertSchema
  .pick({
    money: true
  })
  .extend({ users: z.array(userIdNamePair) })
  .merge(commonFormSchema)
  .omit({ repeatableType: true, repeatableValue: true }); //TODO
export type SettleUpForm = z.infer<typeof settleUpFormSchema>;
