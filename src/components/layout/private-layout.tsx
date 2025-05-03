import { User } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/navigation";
import { NavigationLink } from "@/components/navigation-link";
import { Button } from "@/components/ui/button";

export const PrivateLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
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
      <Button asChild>
        <NavigationLink href="/logout">
          <span>Log out</span>
        </NavigationLink>
      </Button>
    </Navigation>

    <main className="container mx-auto max-w-4/5 px-2 py-8">{children}</main>

    <Footer />
  </>
);
