import { eq } from "drizzle-orm";

import { db } from "@/db";
import { accounts, users } from "@/db/schema/auth";
import { accountsSelectSchema, userSelectSchema } from "@/db/zod/auth";

export const findUserById = async (id: string) => {
  const rows = await db.select().from(users).where(eq(users.id, id));

  if (rows.length !== 1) {
    throw new Error(`User with ID ${id} doesn't exist`);
  }

  return userSelectSchema.parse(rows[0]);
};

/**
 * Returns array of providers associated to the specified users
 * @param userId ID of the users
 * @returns array of providers
 */
export const findProviders = async (userId: string) => {
  const rows = await db.select({ provider: accounts.provider }).from(accounts).where(eq(accounts.userId, userId));

  if (rows.length === 0) {
    return [];
  }

  const arraySchema = accountsSelectSchema.pick({ provider: true }).array();

  return arraySchema.parse(rows);
};
