import { providerMap, signIn } from "@/auth";
import { ProviderButton } from "@/components/providers/provider-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeading } from "@/components/ui/page-heading";

type LoginFormProps = {
  callbackUrl?: string;
};

export const LoginForm = ({ callbackUrl }: LoginFormProps) => (
  <div className="m-auto container flex flex-grow items-center flex-col text-center">
    <PageHeading>Sign In</PageHeading>
    <div className="space-y-4 container m-auto w-100 p-5">
      <div className="grid w-full max-w-sm items-center gap-1.5">
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
      </div>
      <Button>Button</Button>
      <h3>Or use provider</h3>
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          className="text-center items-center container flex flex-col"
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
