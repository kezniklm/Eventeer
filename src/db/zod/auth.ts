import { createSelectSchema } from "drizzle-zod";
import type z from "zod";

import { accounts, users } from "../schema/auth";

export const userSelectSchema = createSelectSchema(users);
export type UserSchema = z.infer<typeof userSelectSchema>;

export const accountsSelectSchema = createSelectSchema(accounts);
export type AccountSchema = z.infer<typeof accountsSelectSchema>;
