import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { event } from "../schema/activity";

import { commonFormSchema, commonInsertSchema } from "./activity";
import { userIdNamePair } from "./user";

export const createEventSchema = createInsertSchema(event).omit({ id: true }).merge(commonInsertSchema);
export type CreateEventSchema = z.infer<typeof createEventSchema>;

export const createEventFormSchema = createEventSchema
  .pick({ place: true, dateTime: true })
  .extend({ users: z.array(userIdNamePair) })
  .and(commonFormSchema);

export type CreateEventFormSchema = z.infer<typeof createEventFormSchema>;
