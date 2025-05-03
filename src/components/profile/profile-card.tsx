import Image from "next/image";

import DefaultIcon from "@/../public/profile-icon.jpg";
import { providerMap } from "@/auth";
import { ProviderLinkButtons } from "@/components/auth/provider-link-buttons";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type UserSchema } from "@/db/zod/auth";
import { findProviders } from "@/repository/user";

type ProfileCardProps = {
  user: UserSchema;
};

export const ProfileCard = async ({ user }: ProfileCardProps) => {
  const userImageSource = user.image ?? DefaultIcon;
  const providersOfUser = (await findProviders(user.id)).map((provider) => provider.provider);

  return (
    <Card className="bg-secondary min-w-2/5">
      <CardHeader>
        <CardTitle className="flex grow flex-col items-center justify-center text-center align-middle">
          <div className="relative float-end m-5 mt-3 mr-3 h-[125px] w-[125px]">
            <Image src={userImageSource} alt="Image" fill className="rounded-full" />
          </div>
          <h2 className="text-md m-5 mt-5 mb-0 break-all">{user.name}</h2>
        </CardTitle>
      </CardHeader>
      <Separator className="bg-separator m-auto w-[80%]" />
      <ProviderLinkButtons providerMap={providerMap} providersOfUser={providersOfUser} />
    </Card>
  );
};
