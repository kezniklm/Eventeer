"use server";

// eslint-disable-next-line import/order
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { del, put } from "@vercel/blob";

import {
  PROFILE_PICTURE_MAX_SIZE,
  profilePictureFileTypes,
  userProfileSchema,
  type UserProfileSchema
} from "@/db/zod/user";
import { updateProfile, updateProfilePicture } from "@/repository/user";
import { composeAvatarPath, getUserId } from "@/server-actions/utils";

export const updateProfileAction = async (userForm: UserProfileSchema) => {
  const data = userProfileSchema.omit({ email: true }).parse(userForm);
  const userID = await getUserId();

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

  const randomID = randomUUID();
  const blobPath = composeAvatarPath(randomID, file);
  const { url } = await put(blobPath, file, { access: "public" });
  const userID = await getUserId();

  const oldPicturePath = await updateProfilePicture(url, userID);

  if (oldPicturePath) removeOldPicture(oldPicturePath);

  revalidatePath("/profile");
};

const removeOldPicture = async (url: string) => {
  // TODO
  if (!url.startsWith("vercel")) {
    return;
  }

  await del(url);
};
