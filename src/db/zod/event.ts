import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { event } from "../schema/activity";

import { commonFormSchema, commonInsertSchema } from "./activity";
import { userIdNamePair } from "./user";

export const createEventSchema = createInsertSchema(event).omit({ id: true }).merge(commonInsertSchema);
export type CreateEventSchema = z.infer<typeof createEventSchema>;

const { place, ...rest } = createEventSchema
  .pick({ place: true, dateTime: true })
  .extend({ users: z.array(userIdNamePair).optional() })
  .merge(commonFormSchema).shape;

export const createEventFormSchema = z.object({
  ...rest,
  place: place.nonempty().max(255)
});

export type CreateEventFormSchema = z.infer<typeof createEventFormSchema>;
