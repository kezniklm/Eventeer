import { User } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/navigation";
import { NavigationLink } from "@/components/navigation-link";

export const PublicLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <>
    <Navigation>
      <NavigationLink href="/login" className="btn btn-secondary flex items-center gap-2">
        <User />
        Sign in
      </NavigationLink>
      <NavigationLink href="/register" className="btn btn-primary flex items-center gap-2">
        <User />
        Sign up
      </NavigationLink>
    </Navigation>

    <main className="container max-w-4/5 mx-auto px-2 py-8">{children}</main>

    <Footer />
  </>
);
