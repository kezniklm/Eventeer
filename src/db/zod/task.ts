import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

import { task } from "../schema/activity";

import { commonInsertSchema } from "./activity";

export const taskInsertSchema = createInsertSchema(task).omit({ id: true }).merge(commonInsertSchema);
export type TaskInsertSchema = z.infer<typeof taskInsertSchema>;
