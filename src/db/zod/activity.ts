import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";

import { periodEnum, priorityEnum, roomActivity } from "../schema/activity";

export const priorityEnumSchema = z.enum(priorityEnum);
export type PriorityEnum = z.infer<typeof priorityEnumSchema>;

export const activitySelectSchema = createSelectSchema(roomActivity);

export const commonInsertSchema = activitySelectSchema.pick({
  created_by: true,
  description: true,
  name: true,
  isPublic: true,
  priority: true,
  repeatableType: true,
  repeatableValue: true
});
export const commonFormSchema = commonInsertSchema.omit({ created_by: true });

export const periodEnumSchema = z.enum(periodEnum);
