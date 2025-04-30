import { User } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/navigation/navigation";
import { NavigationLink } from "@/components/navigation/navigation-link";

export const PublicLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <>
    <Navigation>
      <NavigationLink
        href="/login"
        className="btn btn-secondary text-xs sm:text-sm font-medium flex items-center gap-0.5 md:gap-2"
      >
        <User className="text-xs sm:text-sm" />
        <span className="text-xs sm:text-sm whitespace-nowrap">Sign in</span>
      </NavigationLink>
      <NavigationLink
        href="/register"
        className="btn btn-primary text-xs sm:text-sm font-medium flex items-center gap-0.5 md:gap-2"
      >
        <User className="text-xs sm:text-sm" />
        <span className="text-xs sm:text-sm whitespace-nowrap">Sign up</span>
      </NavigationLink>
    </Navigation>

    <main className="container max-w-4/5 mx-auto px-2 py-8">{children}</main>

    <Footer />
  </>
);
