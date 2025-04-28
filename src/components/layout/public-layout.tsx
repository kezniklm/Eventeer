import { User } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/navigation";
import { NavigationLink } from "@/components/navigation-link";
import { Button } from "@/components/ui/button";

export const PublicLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <>
    <Navigation>
      <Button asChild>
        <NavigationLink href="/login">
          <User />
          <span>Sign in</span>
        </NavigationLink>
      </Button>
      <Button asChild variant="secondary">
        <NavigationLink href="/register">
          <User />
          <span>Sign up</span>
        </NavigationLink>
      </Button>
    </Navigation>

    <main className="container max-w-4/5 mx-auto px-2 py-8">{children}</main>

    <Footer />
  </>
);
