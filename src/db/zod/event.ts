import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

import { event } from "../schema/activity";

export const createEventSchema = createInsertSchema(event).omit({ id: true, createdAt: true });
export type CreateEventSchema = z.infer<typeof createEventSchema>;
