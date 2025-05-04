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
