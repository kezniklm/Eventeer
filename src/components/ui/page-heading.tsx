import { type ReactNode } from "react";

type PageHeadingProps = {
  children: ReactNode;
};

export const PageHeading = ({ children }: PageHeadingProps) => (
  <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in-slow">{children}</h1>
);
