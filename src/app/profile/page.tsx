import { type Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your profile on Eventeer. Edit your personal details, track your events, and more."
};

const ProfilePage = () => (
  <div>
    <Button>Button</Button>
  </div>
);

export default ProfilePage;
