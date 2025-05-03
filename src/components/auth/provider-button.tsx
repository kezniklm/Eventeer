import { type ReactNode } from "react";

import { GoogleIcon } from "./icons/google-icon";

const providerIconMapping: Record<string, ReactNode> = {
  Google: <GoogleIcon />
};

type ProviderButtonProps = {
  name: string;
};

export const ProviderButton = ({ name }: ProviderButtonProps) => (
  <button
    type="submit"
    className="transition duration-500 hover:shadow-lg hover:-translate-y-1 animate-fade-in-slow bg-white border-providers border-solid border rounded-2xl width-auto flex flex-row text-center gap-3 cursor-pointer font-[Roboto] p-2 align-middle"
  >
    <div className="w-[20px] h-[20px] mr-1 ml-1 mt-1">{providerIconMapping[name]}</div>
    Sign in with {name}
  </button>
);
