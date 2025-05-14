import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";

export const TextLoadingSkeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <Skeleton className={cn("bg-secondary min-h-[2rem] w-[15rem] rounded-lg lg:max-w-7xl", className)} {...props} />
);
