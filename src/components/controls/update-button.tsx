import { Pencil } from "lucide-react";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const UpdateButton = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <Pencil className={cn(`text-muted-foreground cursor-pointer`, className)} size="20px" {...props} />
);
