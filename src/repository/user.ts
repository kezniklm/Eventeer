import { eq } from "drizzle-orm";

import { db } from "@/db";
import { accounts, users } from "@/db/schema/auth";
import { accountsSelectSchema, userProfileSchema, userSelectSchema, type UserProfileSchema } from "@/db/zod/user";

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

export const updateProfile = async (data: Omit<UserProfileSchema, "email">, userID: string) => {
  const rows = await db.update(users).set(data).where(eq(users.id, userID)).returning();

  if (rows.length !== 1) {
    throw new Error(`Failed to update profile for user ${userID}. No user found.`);
  }

  return userProfileSchema.parse(rows[0]);
};
