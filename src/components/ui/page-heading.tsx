import { type ReactNode } from "react";

type PageHeadingProps = {
  children: ReactNode;
};

export const PageHeading = ({ children }: PageHeadingProps) => (
  <h1 className="animate-fade-in-slow mb-6 text-5xl leading-tight font-bold md:text-6xl">{children}</h1>
);
