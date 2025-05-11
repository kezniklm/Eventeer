"use client";

import * as React from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    className={cn("p-3", className)}
    classNames={{
      months: "flex flex-col sm:flex-row gap-2",
      month: "flex flex-col gap-4",
      month_caption: "flex justify-center pt-1 relative items-center w-full",
      caption_label: "text-sm font-medium",
      nav: "flex items-center",
      button_previous: cn(
        "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-2 top-0 pt-5 cursor-pointer z-10 absolute"
      ),
      button_next: cn(
        "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-0 top-0 pt-5 cursor-pointer z-10 absolute"
      ),
      month_grid: "w-full border-collapse space-x-1",
      weekdays: "flex",
      weekday: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
      week: "flex w-full mt-2",
      day: cn(
        "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md cursor-pointer",
        props.mode === "range"
          ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
          : "[&:has([aria-selected])]:rounded-md"
      ),
      day_button: cn(
        buttonVariants({ variant: "ghost" }),
        "size-8 p-0 font-normal aria-selected:opacity-100 cursor-pointer"
      ),
      range_start: "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
      range_end: "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
      selected: cn(
        buttonVariants({ variant: "ghost" }),
        "size-8 p-0 font-normal aria-selected:opacity-100 cursor-pointer bg-primary text-primary-foreground"
      ),
      today: "bg-accent text-accent-foreground",
      outside: "day-outside text-muted-foreground aria-selected:text-muted-foreground",
      disabled: "text-muted-foreground opacity-50 day_disabled",
      range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
      hidden: "invisible",
      ...classNames
    }}
    components={{
      Chevron: ({ className, orientation, ...props }) => {
        const chevrons = {
          up: <ChevronUp className={cn("size-4", className)} {...props} />,
          down: <ChevronDown className={cn("size-4", className)} {...props} />,
          left: <ChevronLeft className={cn("size-4", className)} {...props} />,
          right: <ChevronRight className={cn("size-4", className)} {...props} />
        };

        return chevrons[orientation ?? "left"];
      }
    }}
    {...props}
  />
);

export { Calendar };
