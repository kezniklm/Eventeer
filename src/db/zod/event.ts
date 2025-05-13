import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { event } from "../schema/activity";

import { commonFormSchema, commonInsertSchema } from "./activity";
import { userIdNamePair } from "./user";

export const eventSelectSchema = createSelectSchema(event);
export type EventSelectSchema = z.infer<typeof eventSelectSchema>;

export const createEventSchema = createInsertSchema(event).omit({ id: true }).merge(commonInsertSchema);
export type CreateEventSchema = z.infer<typeof createEventSchema>;

export const { place, ...rest } = createEventSchema
  .pick({ place: true, dateTime: true })
  .extend({ users: z.array(userIdNamePair).optional() })
  .merge(commonFormSchema).shape;

export const eventFormSchema = z.object({
  ...rest,
  place: place.nonempty().max(255)
});

export type EventForm = z.infer<typeof eventFormSchema>;
