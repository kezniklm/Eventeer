import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { event } from "../schema/activity";

import { userIdNamePair } from "./user";

export const createEventSchema = createInsertSchema(event)
  .omit({ id: true, createdAt: true })
  .extend({ users: z.array(userIdNamePair) });

export type CreateEventSchema = z.infer<typeof createEventSchema>;

export const createEventFormSchema = createEventSchema.omit({ authorId: true });

export type CreateEventFormSchema = z.infer<typeof createEventFormSchema>;
