import { type ButtonHTMLAttributes } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

type Props = {
  showCheck: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const AnimatedCheckButton = ({ showCheck, className, children, ...props }: Props) => (
  <Button variant="outline" size="sm" className={cn("transition-all duration-1000 ease-in-out", className)} {...props}>
    {children}
    <span
      className={`flex transition-all duration-1000 ease-in-out ${showCheck ? "ml-1 max-w-[24px] opacity-100" : "ml-0 max-w-0 opacity-0"} overflow-hidden`}
    >
      <Check className="ml-1 h-8 w-8 text-green-500" />
    </span>
  </Button>
);
