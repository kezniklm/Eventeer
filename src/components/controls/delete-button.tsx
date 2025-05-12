import { Pencil } from "lucide-react";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const DeleteButton = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <Pencil
    className={cn(
      `text-muted-foreground absolute right-0 bottom-0 m-4 cursor-pointer opacity-0 transition duration-300 group-hover:opacity-100`,
      className
    )}
    size="20px"
    {...props}
  />
);
