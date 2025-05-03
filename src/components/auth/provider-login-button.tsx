import { type ReactNode } from "react";
import Image from "next/image";

import DiscordIcon from "@/../public/discord-provider.svg";
import GoogleIcon from "@/../public/google-provider.svg";

const providerIconMapping: Record<string, ReactNode> = {
  Google: <Image src={GoogleIcon} alt="Google icon" />,
  Discord: <Image src={DiscordIcon} alt="Discord icon" />
};

type ProviderButtonProps = {
  name: string;
};

export const ProviderLoginButton = ({ name }: ProviderButtonProps) => (
  <button
    type="submit"
    className="animate-fade-in-slow border-providers width-auto mt-2 flex min-w-80 cursor-pointer flex-row justify-center gap-3 rounded-2xl border border-solid bg-white p-2 align-middle font-[Roboto] transition duration-500 hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="mt-1 mr-1 ml-1 h-[20px] w-[20px]">{providerIconMapping[name]}</div>
    Sign in with {name}
  </button>
);
