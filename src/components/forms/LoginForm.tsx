import { type HTMLAttributes } from "react";

import { providerMap, signIn } from "@/auth";
import { ProviderButton } from "@/components/providers/provider-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type LoginFormProps = {
  callbackUrl?: string;
} & HTMLAttributes<HTMLDivElement>;

export const LoginForm = ({ callbackUrl, className, ...props }: LoginFormProps) => (
  <div className={cn("p-5", className)} {...props}>
    {/* <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="nickname">Nickname</Label>
      <Input type="nickname" id="nickname" placeholder="Nickname" />
    </div>
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" placeholder="Password" />
    </div> */}
    {/* <Button>Sign in</Button> */}
    <div className="items-center flex flex-col align-middle justify-center min-h-full">
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            await signIn(provider.id, {
              redirectTo: callbackUrl ?? "/"
            });
          }}
        >
          <ProviderButton name={provider.name} />
        </form>
      ))}
    </div>
  </div>
);
