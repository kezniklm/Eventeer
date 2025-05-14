import { Trash2 } from "lucide-react";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const DeleteButton = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <Trash2 role="button" className={cn(`text-muted-foreground cursor-pointer`, className)} size="20px" {...props} />
);
