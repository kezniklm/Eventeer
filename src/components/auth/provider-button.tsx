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

export const ProviderButton = ({ name }: ProviderButtonProps) => (
  <button
    type="submit"
    className="mt-2 min-w-80 transition duration-500 hover:shadow-lg hover:-translate-y-1 animate-fade-in-slow bg-white border-providers border-solid border rounded-2xl width-auto flex flex-row justify-center gap-3 cursor-pointer font-[Roboto] p-2 align-middle"
  >
    <div className="w-[20px] h-[20px] mt-1 mr-1 ml-1">{providerIconMapping[name]}</div>
    Sign in with {name}
  </button>
);
