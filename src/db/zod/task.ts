import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { task } from "../schema/activity";

import { commonFormSchema, commonInsertSchema } from "./activity";
import { userIdNamePair } from "./user";

export const taskSelectSchema = createSelectSchema(task);
export type TaskSelectSchema = z.infer<typeof taskSelectSchema>;

export const taskInsertSchema = createInsertSchema(task)
  .omit({ id: true })
  .merge(commonInsertSchema)
  .extend({
    taskNames: z.array(z.object({ name: z.string(), dbId: z.number().optional() }))
  });

export type TaskInsertSchema = z.infer<typeof taskInsertSchema>;

const { taskNames, ...rest } = taskInsertSchema
  .pick({ taskNames: true, dateTime: true })
  .extend({ users: z.array(userIdNamePair).optional() })
  .merge(commonFormSchema).shape;

export const taskFormSchema = z.object({
  ...rest,
  taskNames: taskNames.superRefine((arr, ctx) => {
    arr.forEach((entry, index) => {
      if (entry.name.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Subtask name must not be empty",
          path: [index, "name"]
        });
      }
    });
  })
});

export type TaskForm = z.infer<typeof taskFormSchema>;
