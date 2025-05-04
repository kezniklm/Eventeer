import { ProfileForm } from "@/components/profile/profile-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { type UserSchema } from "@/db/zod/auth";

type ProfileCardProps = {
  user: UserSchema;
};

export const ProfileDetails = async ({ user }: ProfileCardProps) => (
  <Card className="bg-secondary w-full items-center text-center md:w-1/2 md:min-w-1/2">
    <CardHeader>
      <CardTitle className="flex grow flex-col items-center justify-center text-center align-middle" />
    </CardHeader>
    <ProfileForm user={user} />
  </Card>
);
