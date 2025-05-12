import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { event } from "../schema/activity";

import { userIdNamePair } from "./user";
import { commonFormSchema } from "./activity";

export const createEventSchema = createInsertSchema(event).omit({ id: true });

export type CreateEventSchema = z.infer<typeof createEventSchema>;

export const createEventFormSchema = createEventSchema
  .pick({
    isPublic: true,
    priority: true,
    dateTime: true,
    repeatableType: true,
    repeatableValue: true,
    place: true
  })
  .extend({ users: z.array(userIdNamePair) })
  .and(commonFormSchema);

export type CreateEventFormSchema = z.infer<typeof createEventFormSchema>;
