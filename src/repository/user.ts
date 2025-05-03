import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema/auth";
import { userSelectSchema } from "@/db/zod/auth";

export const findUserById = async (id: string) => {
  const rows = await db.select().from(users).where(eq(users.id, id));

  if (rows.length !== 1) {
    throw new Error(`User with ID ${id} doesn't exist`);
  }

  return userSelectSchema.parse(rows[0]);
};
