import { type SVGProps } from "react";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

export const LoadingWheel = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <Loader className={cn("animate-spin", className)} {...props} />
);
