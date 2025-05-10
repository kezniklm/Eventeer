import { User } from "lucide-react";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { CreateRoomForm } from "@/components/forms/create-room-form";
import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/navigation";
import { NavigationLink } from "@/components/navigation-link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

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
      <div className="flex flex-col space-y-6">
        <div className="space-x-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create room</Button>
            </DialogTrigger>
            <DialogContent className="bg-secondary max-h h-fit overflow-auto">
              <DialogHeader>
                <DialogTitle />
                <DialogDescription />
              </DialogHeader>
              <div className="mx-auto w-full max-w-sm rounded-md bg-white p-4 shadow-2xl">
                <CreateRoomForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <SignOutButton />
    </Navigation>

    <main className="container mx-auto max-w-4/5 px-2 py-8">{children}</main>

    <Footer />
  </>
);
