import { type Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import DefaultIcon from "@/../public/profile-icon.jpg";
import { auth } from "@/auth";
import { ProfileCard } from "@/components/profile/profile-card";
import { Button } from "@/components/ui/button";
import { findUserById } from "@/repository/user";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your profile on Eventeer. Edit your personal details, track your events, and more."
};

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

  const user = await findUserById(session.user.id ?? "");
  const userImageSource = user.image ?? DefaultIcon;

  return (
    <div className="m-auto flex w-[80%] flex-row justify-center gap-10 text-center">
      <ProfileCard user={user} />
      <div className="bg-secondary w-3/5"></div>
    </div>
  );
};

export default ProfilePage;
