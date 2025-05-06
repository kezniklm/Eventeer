import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ProfileCard } from "@/components/profile/profile-card";
import { ProfileDetails } from "@/components/profile/profile-details-card";
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

  return (
    <div className="m-auto flex w-[100%] flex-col justify-center gap-10 text-center md:flex-row xl:w-[80%]">
      <ProfileCard user={user} />
      <ProfileDetails user={user} />
    </div>
  );
};

export default ProfilePage;
