import { Pencil } from "lucide-react";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const UpdateButton = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <Pencil
    role="button"
    className={cn(
      `text-muted-foreground cursor-pointer opacity-0 transition duration-300 group-hover:opacity-100`,
      className
    )}
    size="20px"
    {...props}
  />
);
