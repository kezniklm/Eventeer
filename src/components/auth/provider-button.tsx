import { type ButtonHTMLAttributes, type PropsWithChildren, type ReactNode } from "react";
import Image from "next/image";

import DiscordIcon from "@/../public/discord-provider.svg";
import GoogleIcon from "@/../public/google-provider.svg";
import { cn } from "@/lib/utils";

const providerIconMapping: Record<string, ReactNode> = {
  Google: <Image src={GoogleIcon} alt="Google icon" />,
  Discord: <Image src={DiscordIcon} alt="Discord icon" />
};

type ProviderButtonProps = PropsWithChildren<{ name: string }> & ButtonHTMLAttributes<HTMLButtonElement>;

export const ProviderButton = ({ name, children, className, ...props }: ProviderButtonProps) => (
  <button
    {...props}
    type="submit"
    className={cn(
      "enabled:animate-fade-in-slow border-providers mt-2 flex w-full flex-row justify-center gap-3 rounded-2xl border border-solid bg-white p-2 align-middle font-[Roboto] transition duration-500 enabled:cursor-pointer enabled:hover:-translate-y-1 enabled:hover:shadow-lg disabled:bg-gray-100",
      className
    )}
  >
    <div className="mt-1 mr-1 ml-1 h-[20px] w-[20px]">{providerIconMapping[name]}</div>
    {children}
  </button>
);

export const ProviderLoginButton = ({ name }: { name: string }) => (
  <ProviderButton name={name}>Sign in with {name} </ProviderButton>
);
