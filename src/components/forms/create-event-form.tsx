"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn, firstLetterUppercase } from "@/lib/utils";
import { useRoomContext } from "@/context/room-context";
import { createEventFormSchema, type CreateEventFormSchema } from "@/db/zod/event";
import { priorityEnumSchema } from "@/db/zod/activity";
import { periodEnum } from "@/db/schema/activity";

import { FormInput } from "../ui/form-input";

export const CreateEventForm = () => {
  const roomInfo = useRoomContext();

  const form = useForm<CreateEventFormSchema>({
    resolver: zodResolver(createEventFormSchema)
  });

  const repeatableValue = useWatch({
    control: form.control,
    name: "repeatableValue",
    defaultValue: false
  });

  // const mutation = useCreateEventMutation();

  const onSubmit = (data: CreateEventFormSchema) => {
    // mutation.mutate(
    //   { roomId: roomInfo.room.id, data },
    //   {
    //     onSuccess: (data) => {
    //       toast.success(`Event ${data.name} created!`);
    //       setTimeout(onSubmit);
    //     },
    //     onError: (error) => toast.error(`Failed to create Event: ${error.message}`)
    //   }
    // );
    console.log(data);
  };

  useEffect(() => console.log(form.formState.errors), [form.formState.errors]);

  return (
    <FormProvider {...form}>
      <form className="flex flex-col space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name */}
        <FormInput required type="text" name="name" label="Name" placeholderAsLabel />

        {/* Description */}
        <FormInput type="text" name="description" label="Description" placeholderAsLabel />

        {/* Place */}
        <FormInput required type="text" label="Place" name="place" placeholderAsLabel />

        {/* Date */}
        <Controller
          control={form.control}
          name="dateTime"
          defaultValue={new Date()}
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
        <div className="grid w-full items-center gap-2">
          <Label>Users</Label>
          {roomInfo.users.map((userItem) => (
            <Controller
              key={userItem.id}
              control={form.control}
              name="users"
              defaultValue={[]}
              render={({ field }) => (
                <div className="flex flex-wrap gap-4 px-2">
                  <div className="flex gap-2">
                    <Checkbox
                      id={`checkbox-${userItem.id}`}
                      checked={field.value?.find((value) => value.id === userItem.id) ? true : false}
                      onCheckedChange={(checked) =>
                        checked
                          ? field.onChange([...field.value, userItem])
                          : field.onChange(field.value?.filter((value) => value.id !== userItem.id))
                      }
                    />
                    <Label className="text-xs text-gray-500" htmlFor={`checkbox-${userItem.id}`}>
                      {userItem.name}
                    </Label>
                  </div>
                </div>
              )}
            />
          ))}
        </div>

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
          defaultValue={false}
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

        {/* Repeatable / One-time */}
        <Controller
          control={form.control}
          name="repeatableValue"
          defaultValue={false}
          render={({ field }) => (
            <div className="grid w-full items-center gap-2">
              <Label>Repeatable/One time</Label>
              <RadioGroup
                value={field.value ? "repeatable" : "one-time"}
                onValueChange={(val) => field.onChange(val === "repeatable")}
                className="flex flex-wrap gap-4 px-2"
              >
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

        {/* Period Type */}
        <Controller
          control={form.control}
          name="repeatableType"
          defaultValue={repeatableValue ? "WEEKLY" : null}
          render={({ field }) => (
            <div className="grid w-full items-center gap-2">
              <Label>Period</Label>
              <RadioGroup
                value={field.value}
                onValueChange={(val) => {
                  if (repeatableValue) {
                    field.onChange(val);
                  } else {
                    field.onChange(null);
                  }
                }}
                className="flex flex-wrap gap-4 px-2"
              >
                {periodEnum.map((value) => (
                  <div key={value} className="flex gap-2">
                    <RadioGroupItem value={value} id={`period-${value}`} disabled={!repeatableValue} />
                    <Label
                      htmlFor={`period-${value}`}
                      className={`text-xs ${!repeatableValue ? "text-gray-300" : "text-gray-500"}`}
                    >
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
