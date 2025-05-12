"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn, firstLetterUppercase } from "@/lib/utils";
import { useRoomContext } from "@/context/room-context";
import { createEventFormSchema, type CreateEventFormSchema, type CreateEventSchema } from "@/db/zod/event";
import { periodEnumSchema, priorityEnumSchema } from "@/db/zod/activity";

import { FormInput } from "../ui/form-input";

export const CreateEventForm = () => {
  const roomInfo = useRoomContext();

  const form = useForm<CreateEventFormSchema>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      roomId: roomInfo.room.id
    }
  });

  const onSubmit = (createEventData: CreateEventFormSchema) => {
    console.log(createEventData);
  };

  useEffect(() => console.log(form.formState.errors), [form.formState.errors]);

  return (
    <FormProvider {...form}>
      <form className="flex flex-col space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name */}
        <FormInput type="name" id="name" placeholder="Name" label="Name" name="name" />

        {/* Description */}
        <FormInput
          type="description"
          id="description"
          placeholder="Description"
          label="Description"
          name="description"
        />

        {/* Place */}
        <FormInput type="place" id="place" placeholder="Place" label="Place" name="place" />

        {/* Date */}
        <Controller
          control={form.control}
          name="dateTime"
          defaultValue={null}
          render={({ field }) => (
            <div className="grid w-full items-center gap-1.5">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="pointer-events-auto w-auto p-0">
                  <Calendar mode="single" selected={field.value ?? undefined} onSelect={field.onChange} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          )}
        />

        {/* Users */}
        {roomInfo.users.map((userItem) => (
          <Controller
            key={userItem.id}
            control={form.control}
            name="users"
            defaultValue={[]}
            render={({ field }) => (
              <div className="grid w-full items-center gap-2">
                <Label>Users</Label>
                <div className="flex flex-wrap gap-4 px-2">
                  <div className="flex gap-2">
                    <Checkbox
                      checked={field.value?.find((value) => value.id === userItem.id) ? true : false}
                      onCheckedChange={(checked) =>
                        checked
                          ? field.onChange([...field.value, userItem])
                          : field.onChange(field.value?.filter((value) => value.id !== userItem.id))
                      }
                    />
                    <Label className="text-xs text-gray-500">{userItem.name}</Label>
                  </div>
                </div>
              </div>
            )}
          />
        ))}

        {/* Priority */}
        <Controller
          control={form.control}
          name="priority"
          defaultValue="NORMAL"
          render={({ field }) => (
            <div className="grid w-full items-center gap-2">
              <Label>Priority</Label>
              <RadioGroup defaultValue="NORMAL" className="flex flex-wrap gap-4 px-2" onChange={field.onChange}>
                {Object.values(priorityEnumSchema.enum).map((value) => (
                  <div key={value} className="flex gap-2">
                    <RadioGroupItem value={value} id={`priority-${value}`} />
                    <Label htmlFor={`priority-${value}`} className="text-xs text-gray-500">
                      {firstLetterUppercase(value)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        />

        {/* Status */}
        <Controller
          control={form.control}
          name="isPublic"
          defaultValue
          render={({ field }) => (
            <div className="grid w-full items-center gap-2">
              <Label>Status</Label>
              <RadioGroup
                value={field.value ? "public" : "private"}
                onValueChange={(value) => field.onChange(value === "public")}
                className="flex flex-wrap gap-4 px-2"
              >
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
          )}
        />

        {/* Period */}
        <Controller
          control={form.control}
          name="repeatableType"
          defaultValue="one-time"
          render={({ field }) => (
            <div className="grid w-full items-center gap-2">
              <Label>Repeatable/One time</Label>
              <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-wrap gap-4 px-2">
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
          )}
        />

        {/* Daily/Weekly/Monthly/Yearly */}
        <Controller
          control={form.control}
          name="repeatableType"
          defaultValue="WEEKLY"
          render={({ field }) => (
            <div className="grid w-full items-center gap-2">
              <Label>Period</Label>
              <RadioGroup
                defaultValue="WEEKLY"
                className="flex flex-wrap gap-4 px-2"
                onValueChange={field.onChange}
                value={field.value}
              >
                {Object.values(periodEnumSchema.enum).map((value) => (
                  <div key={value} className="flex gap-2">
                    <RadioGroupItem value={value} id={`period-${value}`} />
                    <Label htmlFor={`period-${value}`} className="text-xs text-gray-500">
                      {firstLetterUppercase(value)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        />

        <Button className="m-auto">Submit</Button>
      </form>
    </FormProvider>
  );
};
