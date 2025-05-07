import { del, put } from "@vercel/blob";

import { auth } from "@/auth";

export const userIdMatches = async (userID: string) => {
  const session = await auth();

  const actualID = session?.user?.id;
  if (!actualID) {
    throw new Error("User is not logged in!");
  }

  if (actualID !== userID) {
    throw new Error("You don't have permissions to update the profile!");
  }
};

export const getUserId = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You are not authenticated!");
  }

  return session.user.id;
};

export const composeAvatarPath = (fileID: string, file: File) => {
  const fileSuffix = file.name.split(".").pop();

  return `avatars/${fileID}.${fileSuffix}`;
};

export const removeBlob = async (url: string) => {
  if (!url.includes("blob.vercel-storage.com")) {
    return;
  }

  if (!isBlobStorageConfigured()) {
    throw new Error("Server error: Blob storage is not configured!");
  }

  console.info(`Removing blob ${url}`);
  await del(url);
};

export const uploadBlob = async (blobPath: string, file: File) => {
  if (!isBlobStorageConfigured()) {
    throw new Error("Server error: Blob storage is not configured!");
  }

  return await put(blobPath, file, { access: "public" });
};

const isBlobStorageConfigured = () => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return false;
  }

  return true;
};
