import { createSelectSchema } from "drizzle-zod";
import type z from "zod";

import { users } from "../schema/auth";

export const userSelectSchema = createSelectSchema(users);
export type UserSchema = z.infer<typeof userSelectSchema>;
