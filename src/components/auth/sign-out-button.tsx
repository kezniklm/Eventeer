"use client";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/server-actions";

export const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOutAction();
  };

  return (
    <Button className="cursor-pointer" onClick={handleSignOut}>
      <span>Log out</span>
    </Button>
  );
};
