"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useRoomContext } from "@/context/room-context";

export const CreateTaskForm = () => {
  const [date, setDate] = React.useState<Date>();
  const _roomInfo = useRoomContext();

  return (
    <div className="flex flex-col space-y-6">
      {/* Name */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="name" id="name" placeholder="Name" />
      </div>

      {/* Description */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input type="description" id="description" placeholder="Description" />
      </div>

      {/* Date */}
      <div className="grid w-full items-center gap-1.5">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="pointer-events-auto w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      {/* Users */}
      <div className="grid w-full items-center gap-2">
        <Label>Users</Label>
        <div className="flex flex-wrap gap-4 px-2">
          <div className="flex gap-2">
            <Checkbox id="user1" />
            <Label className="text-xs text-gray-500" htmlFor="user1">
              User1
            </Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="user2" />
            <Label className="text-xs text-gray-500" htmlFor="user2">
              User2
            </Label>
          </div>
        </div>
      </div>

      {/* Priority */}
      <div className="grid w-full items-center gap-2">
        <Label>Priority</Label>
        <RadioGroup defaultValue="low" className="flex flex-wrap gap-4 px-2">
          <div className="flex gap-2">
            <RadioGroupItem value="high" id="high" />
            <Label htmlFor="high" className="text-xs text-gray-500">
              High
            </Label>
          </div>
          <div className="flex gap-2">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low" className="text-xs text-gray-500">
              Low
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Status */}
      <div className="grid w-full items-center gap-2">
        <Label>Status</Label>
        <RadioGroup defaultValue="public" className="flex flex-wrap gap-4 px-2">
          <div className="flex gap-2">
            <RadioGroupItem value="public" id="public" />
            <Label htmlFor="public" className="text-xs text-gray-500">
              Public
            </Label>
          </div>
          <div className="flex gap-2">
            <RadioGroupItem value="private" id="private" />
            <Label htmlFor="private" className="text-xs text-gray-500">
              Private
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Period */}
      <div className="grid w-full items-center gap-2">
        <Label>Repeatable/One time</Label>
        <RadioGroup defaultValue="one-time" className="flex flex-wrap gap-4 px-2">
          <div className="flex gap-2">
            <RadioGroupItem value="one-time" id="one-time" />
            <Label htmlFor="one-time" className="text-xs text-gray-500">
              One-time
            </Label>
          </div>
          <div className="flex gap-2">
            <RadioGroupItem value="repeatable" id="repeatable" />
            <Label htmlFor="repeatable" className="text-xs text-gray-500">
              Repeatable
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Daily/Weekly/Monthly/Yearly */}
      <div className="grid w-full items-center gap-2">
        <Label>Period</Label>
        <RadioGroup defaultValue="weekly" className="flex flex-wrap gap-4 px-2">
          <div className="flex gap-2">
            <RadioGroupItem value="daily" id="daily" />
            <Label htmlFor="daily" className="text-xs text-gray-500">
              Daily
            </Label>
          </div>
          <div className="flex gap-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly" className="text-xs text-gray-500">
              Weekly
            </Label>
          </div>
          <div className="flex gap-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly" className="text-xs text-gray-500">
              Monthly
            </Label>
          </div>
          <div className="flex gap-2">
            <RadioGroupItem value="yearly" id="yearly" />
            <Label htmlFor="yearly" className="text-xs text-gray-500">
              Yearly
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Tasks */}
      <div className="grid w-full items-center gap-2">
        <Label>Tasks</Label>
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2">
            <Checkbox id="task1" />
            <Label className="text-xs text-gray-500" htmlFor="task1">
              Task1
            </Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="task2" />
            <Label className="text-xs text-gray-500" htmlFor="task2">
              Task2
            </Label>
          </div>
        </div>
      </div>
      <Button className="m-auto">Submit</Button>
    </div>
  );
};
