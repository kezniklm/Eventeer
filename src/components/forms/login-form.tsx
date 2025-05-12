"use client";

import { useEffect, type HTMLAttributes } from "react";
import { toast } from "sonner";

import { type ProviderMap } from "@/auth";
import { ProviderLoginButton } from "@/components/auth/provider-button";
import { cn } from "@/lib/utils";
import { signInAction } from "@/server-actions";

const errors: Record<string, string> = {
  OAuthAccountNotLinked: "You email is already linked to another account!"
};

type LoginFormProps = {
  callbackUrl?: string;
  providerMap: ProviderMap[];
  errorType?: string;
} & HTMLAttributes<HTMLDivElement>;

export const LoginForm = ({ callbackUrl, providerMap, errorType, className, ...props }: LoginFormProps) => {
  useEffect(() => {
    if (!errorType) {
      return;
    }

    const error = errors[errorType] ?? "Unexpected error during log in";
    setTimeout(() => toast.error(error));
  }, [errorType]);

  return (
    <div className={cn("p-5 md:p-10", className)} {...props}>
      <div className="flex min-h-full flex-col items-center justify-center align-middle">
        {Object.values(providerMap).map((provider) => (
          <form
            className="w-full"
            key={provider.id}
            onSubmit={async (e) => {
              e.preventDefault();
              await signInAction({ provider: provider.id, callbackUrl });
            }}
          >
            <ProviderLoginButton name={provider.name} />
          </form>
        ))}
      </div>
    </div>
  );
};
