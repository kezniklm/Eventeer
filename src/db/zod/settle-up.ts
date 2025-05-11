import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

import { settleUp } from "../schema/activity";

export const settleUpInsertSchema = createInsertSchema(settleUp).omit({ id: true });
export type SettleUpInsertSchema = z.infer<typeof settleUpInsertSchema>;
