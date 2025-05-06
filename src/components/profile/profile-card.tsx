import { providerMap } from "@/auth";
import { ProviderLinkButtons } from "@/components/auth/provider-link-buttons";
import { ProfilePicture } from "@/components/profile/profile-picture";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type UserSchema } from "@/db/zod/user";
import { findProviders } from "@/repository/user";

type ProfileCardProps = {
  user: UserSchema;
};

export const ProfileCard = async ({ user }: ProfileCardProps) => {
  const providersOfUser = (await findProviders(user.id)).map((provider) => provider.provider);

  return (
    <Card className="bg-secondary w-full min-w-fit md:w-1/2">
      <CardHeader>
        <CardTitle className="flex grow flex-col flex-wrap items-center justify-center text-center align-middle">
          <ProfilePicture user={user} />
          <h2 className="text-md m-5 mt-5 mb-0 break-all">{user.name}</h2>
          {user.nickname && (
            <span className="text-md mt-3 text-gray-500 italic before:pr-1.5 before:content-['#']">
              {user.nickname}
            </span>
          )}
          {user.description && <span className="text-md mt-3 text-gray-500 italic">{user.description}</span>}
        </CardTitle>
      </CardHeader>
      <Separator className="bg-separator m-auto w-[80%]" />
      <ProviderLinkButtons providerMap={providerMap} providersOfUser={providersOfUser} />
    </Card>
  );
};
