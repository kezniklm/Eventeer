"use server";

import { revalidatePath } from "next/cache";

import { userProfileSchema, type UserProfileSchema } from "@/db/zod/auth";
import { updateProfile } from "@/repository/user";
import { userIdMatches } from "@/server-actions/utils";

export const updateProfileAction = async (userForm: UserProfileSchema, userID: string) => {
  const data = userProfileSchema.omit({ email: true }).parse(userForm);
  await userIdMatches(userID);

  revalidatePath("/profile");
  return updateProfile(data, userID);
};
