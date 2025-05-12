import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

import { event } from "../schema/activity";

import { commonInsertSchema } from "./activity";

export const createEventSchema = createInsertSchema(event).omit({ id: true }).merge(commonInsertSchema);
export type CreateEventSchema = z.infer<typeof createEventSchema>;
