import { User } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/navigation";
import { NavigationLink } from "@/components/navigation-link";

export const PrivateLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <>
    <Navigation>
      <NavigationLink href="/profile" className="btn btn-secondary flex items-center gap-2">
        <User />
        User
      </NavigationLink>
      <NavigationLink href="/rooms" className="btn btn-primary flex items-center gap-2">
        Rooms
      </NavigationLink>
      <NavigationLink href="/logout" className="btn btn-primary flex items-center gap-2">
        Log out
      </NavigationLink>
    </Navigation>

    <main className="container max-w-4/5 mx-auto px-2 py-8">{children}</main>

    <Footer />
  </>
);
