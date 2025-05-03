import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ProfileCard } from "@/components/profile/profile-card";
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
    <div className="m-auto flex w-[80%] flex-row justify-center gap-10 text-center">
      <ProfileCard user={user} />
      <div className="bg-secondary w-3/5" />
    </div>
  );
};

export default ProfilePage;
