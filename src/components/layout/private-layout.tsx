import { User } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/navigation";
import { NavigationLink } from "@/components/navigation-link";
import { Button } from "@/components/ui/button";
import { findUserById } from "@/repository/user";
import { CreateRoomPopup } from "@/components/room/create-room-popup";

export const PrivateLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

  const user = await findUserById(session.user.id ?? "");
  return (
    <>
      <Navigation>
        <Button asChild variant="secondary">
          <NavigationLink href="/profile">
            <User />
            <span>User</span>
          </NavigationLink>
        </Button>
        <Button asChild>
          <NavigationLink href="/rooms">
            <span>Rooms</span>
          </NavigationLink>
        </Button>
        <div className="flex w-full flex-col space-y-6">
          <div className="space-x-10">
            <CreateRoomPopup user={user} />
          </div>
        </div>
        <SignOutButton />
      </Navigation>

      <main className="container mx-auto max-w-4/5 px-2 py-8">{children}</main>

      <Footer />
    </>
  );
};
