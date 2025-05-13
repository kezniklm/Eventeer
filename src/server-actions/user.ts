"use server";

import { randomUUID } from "crypto";

import { revalidateTag } from "next/cache";

import {
  PROFILE_PICTURE_MAX_SIZE,
  profilePictureFileTypes,
  userProfileSchema,
  type UserProfileSchema
} from "@/db/zod/user";
import { updateProfile, updateProfilePicture } from "@/repository/user";
import { composeAvatarPath, getUserId, removeBlob, uploadBlob } from "@/server-actions/utils";

export const updateProfileAction = async (userForm: UserProfileSchema) => {
  const data = userProfileSchema.omit({ email: true }).parse(userForm);
  const userID = await getUserId();

  revalidateTag("profile");
  return updateProfile(data, userID);
};

export const updateProfilePictureAction = async (file?: File) => {
  const userID = await getUserId();

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
  const { url } = await uploadBlob(blobPath, file);
  console.info(`Saved blob ${url} for user ${userID}`);

  const oldPicturePath = await updateProfilePicture(url, userID);

  if (oldPicturePath) removeBlob(oldPicturePath);

  revalidateTag("profile");
};
