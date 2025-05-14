import { User } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/navigation";
import { NavigationLink } from "@/components/navigation-link";
import { Button } from "@/components/ui/button";

export const PrivateLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

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
        <SignOutButton />
      </Navigation>

      <main className="container mx-auto px-8 py-8 lg:max-w-4/5">{children}</main>

      <Footer />
    </>
  );
};
