"use server";

import { signIn, signOut } from "@/auth";

export const signOutAction = async () => {
  await signOut({ redirectTo: "/" });
};

export const signInAction = async ({ provider, callbackUrl }: { provider: string; callbackUrl?: string }) => {
  await signIn(provider, {
    redirectTo: callbackUrl ?? ""
  });
};
