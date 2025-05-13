import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { accounts, users } from "../schema/auth";

export const userSelectSchema = createSelectSchema(users);
export type UserSchema = z.infer<typeof userSelectSchema>;

export const accountsSelectSchema = createSelectSchema(accounts);
export type AccountSchema = z.infer<typeof accountsSelectSchema>;

const { name, ...rest } = userSelectSchema.pick({
  email: true,
  name: true,
  nickname: true,
  description: true
}).shape;

export const userProfileSchema = z.object({
  ...rest,
  name: name.nonempty().max(255)
});
export type UserProfileSchema = z.infer<typeof userProfileSchema>;

export const PROFILE_PICTURE_MAX_SIZE = 4 * 1024 * 1024;
export const profilePictureFileTypes = ["image/png", "image/jpg", "image/jpeg"];

export const userIdNamePair = userSelectSchema.pick({ id: true, name: true });
export type UserIdNamePair = z.infer<typeof userIdNamePair>;
