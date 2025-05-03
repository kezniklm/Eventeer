"use client";

import { type ProviderMap } from "@/auth";
import { ProviderButton } from "@/components/auth/provider-button";
import { signInAction } from "@/server-actions";

type ProviderLinkButtonsProps = {
  providersOfUser: string[];
  providerMap: ProviderMap[];
};

export const ProviderLinkButtons = async ({ providersOfUser, providerMap }: ProviderLinkButtonsProps) => {
  const isLinked = (provider: ProviderMap) => providersOfUser.includes(provider.id);

  return providerMap.map((provider) => (
    <form
      key={provider.id}
      onSubmit={async (e) => {
        e.preventDefault();
        await signInAction({ provider: provider.id, callbackUrl: "/profile" });
      }}
    >
      <ProviderButton key={provider.id} name={provider.name} disabled={isLinked(provider)} className="m-auto w-50">
        {isLinked(provider) ? `Linked with ${provider.name}` : `Link with ${provider.name}`}
      </ProviderButton>
    </form>
  ));
};
