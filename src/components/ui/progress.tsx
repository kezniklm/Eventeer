import * as React from "react";

import { cn } from "@/lib/utils";

type ProgressProps = {
  value?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const Progress = ({ className, value = 0, ...props }: ProgressProps) => (
  <div className={cn("relative h-2 w-full rounded-full bg-white", className)} {...props}>
    <div
      className="bg-primary absolute top-0 left-0 h-full rounded-full transition-all duration-500"
      style={{ width: `${value}%` }}
    />
  </div>
);
