"use server";

import { revalidatePath } from "next/cache";

import {
  PROFILE_PICTURE_MAX_SIZE,
  profilePictureFileTypes,
  userProfileSchema,
  type UserProfileSchema
} from "@/db/zod/user";
import { updateProfile } from "@/repository/user";
import { userIdMatches } from "@/server-actions/utils";

export const updateProfileAction = async (userForm: UserProfileSchema, userID: string) => {
  const data = userProfileSchema.omit({ email: true }).parse(userForm);
  await userIdMatches(userID);

  revalidatePath("/profile");
  return updateProfile(data, userID);
};

export const updateProfilePictureAction = async (file?: File) => {
  console.log(file);

  if (!file) {
    return;
  }

  if (file.size > PROFILE_PICTURE_MAX_SIZE) {
    throw new Error("Exceeded maximum allowed size of the file");
  }

  if (!profilePictureFileTypes.includes(file.type)) {
    throw new Error(`MIME type ${file.type} is not allowed!`);
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));
  revalidatePath("/profile");
};
