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
