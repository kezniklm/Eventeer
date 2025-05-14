import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

import { db } from "@/db";
import { accounts, users } from "@/db/schema/auth";
import { accountsSelectSchema, userProfileSchema, userSelectSchema, type UserProfileSchema } from "@/db/zod/user";

export const findUserById = async (id: string) => {
  "use cache";
  cacheTag("user", "profile");
  cacheLife("days");

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
  "use cache";
  cacheTag("user", "profile", "providers");
  cacheLife("weeks");

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

export const updateProfilePicture = async (url: string, userID: string) =>
  await db.transaction(async (tx) => {
    const oldImageRows = await tx.select({ image: users.image }).from(users).where(eq(users.id, userID));
    const rows = await tx.update(users).set({ image: url }).where(eq(users.id, userID));

    if (rows.rowsAffected !== 1) {
      tx.rollback();
      throw new Error("Failed to update users's image");
    }

    if (oldImageRows.length !== 1) {
      tx.rollback();
      throw new Error("Failed to update user's image");
    }

    return oldImageRows[0].image;
  });
