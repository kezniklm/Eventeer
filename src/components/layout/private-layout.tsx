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
      <NavigationLink
        href="/profile"
        className="btn btn-secondary text-xs sm:text-sm font-medium flex items-center gap-0.5 md:gap-2"
      >
        <User className="text-xs sm:text-sm" />
        <span className="text-xs sm:text-sm whitespace-nowrap">User</span>
      </NavigationLink>
      <NavigationLink
        href="/rooms"
        className="btn btn-primary text-xs sm:text-sm font-medium flex items-center gap-0.5 md:gap-2"
      >
        <span className="text-xs sm:text-sm whitespace-nowrap">Rooms</span>
      </NavigationLink>
      <NavigationLink
        href="/logout"
        className="btn btn-primary text-xs sm:text-sm font-medium flex items-center gap-0.5 md:gap-2"
      >
        <span className="text-xs sm:text-sm whitespace-nowrap">Log out</span>
      </NavigationLink>
    </Navigation>

    <main className="container max-w-4/5 mx-auto px-2 py-8">{children}</main>

    <Footer />
  </>
);
