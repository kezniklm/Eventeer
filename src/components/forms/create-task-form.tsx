"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, FormProvider, useWatch, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn, firstLetterUppercase } from "@/lib/utils";
import { useRoomContext } from "@/context/room-context";
import { periodEnum } from "@/db/schema/activity";
import { priorityEnumSchema } from "@/db/zod/activity";
import { type TaskForm, taskFormSchema } from "@/db/zod/task";
import { useCreateTaskMutation, useDeleteSubTaskMutation, useUpdateTaskMutation } from "@/hooks/mutations/task";
import { useUpdateTaskContext } from "@/context/task-update-context";

import { FormInput } from "../ui/form-input";

import { SubmitButton } from "./submit-button";

type FormProps = {
  onSubmit: () => void;
};

export const CreateTaskForm = ({ onSubmit }: FormProps) => {
  const updateData = useUpdateTaskContext();

  const roomInfo = useRoomContext();

  const form = useForm<TaskForm>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: updateData?.data
  });

  const { control, formState } = form;

  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "taskNames"
  });

  const repeatableValue = useWatch({
    control: form.control,
    name: "repeatableValue",
    defaultValue: false
  });

  const createMutation = useCreateTaskMutation();

  const updateMutation = useUpdateTaskMutation();

  const deleteSubTaskMutation = useDeleteSubTaskMutation();

  const handleCreateSubmit = async (data: TaskForm) => {
    await createMutation.mutateAsync(
      { roomId: roomInfo.room.id, data },
      {
        onSuccess: (data) => {
          toast.success(`Task ${data.name} created!`);
          setTimeout(onSubmit, 500);
        },
        onError: (error) => toast.error(`Failed to create Task: ${error.message}`)
      }
    );
  };

  const handleUpdateSubmit = (data: TaskForm, taskId: number) => {
    updateMutation.mutate(
      { data, taskId, roomId: roomInfo.room.id },
      {
        onSuccess: (data) => {
          toast.success(`Task ${data.name} updated!`);
          setTimeout(onSubmit, 500);
        },
        onError: (error) => toast.error(`Failed to update Task: ${error.message}`)
      }
    );
  };

  const handleSubmit = (data: TaskForm) => {
    if (updateData) {
      handleUpdateSubmit(data, updateData.taskId);
    } else {
      handleCreateSubmit(data);
    }
  };

  const onSubTaskDelete = async (subtaskId: number | undefined, index: number) => {
    remove(index);

    if (subtaskId) {
      await deleteSubTaskMutation.mutateAsync(subtaskId);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <FormProvider {...form}>
      <form className="flex flex-col space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        {/* Name */}
        <FormInput type="text" name="name" label="Name" placeholderAsLabel />
        {/* Description */}
        <FormInput type="text" name="description" label="Description" placeholderAsLabel />

        {/* Date */}
        <Controller
          control={form.control}
          name="dateTime"
          defaultValue={new Date()}
          render={({ field }) => {
            const value = field.value ?? new Date();
            return (
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
                  <PopoverContent className="pointer-events-auto w-auto space-y-2 p-2">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={(date) => {
                        field.onChange(date ?? new Date());
                      }}
                      defaultMonth={value}
                    />
                    <Button variant="ghost" className="w-full text-red-500" onClick={() => field.onChange(undefined)}>
                      Reset Date
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            );
          }}
        />

        {/* Users */}
        {roomInfo.users.length !== 0 && (
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
                            ? field.onChange([...(field.value ?? []), userItem])
                            : field.onChange((field.value ?? []).filter((value) => value.id !== userItem.id))
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
        )}
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

        {/* Tasks */}
        <div className="w-full space-y-2">
          <Label>Tasks</Label>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormInput
                  type="text"
                  name={`taskNames.${index}.name`}
                  label={`Task ${index + 1}`}
                  placeholderAsLabel
                  hideLabel
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 -translate-y-0.75 transform"
                  onClick={() => onSubTaskDelete(field.dbId, index)}
                >
                  ✕
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => append({ name: "" })}>
              + Add Subtask
            </Button>
          </div>
          {errors.taskNames && <p className="text-sm text-red-500">{errors.taskNames.message}</p>}
        </div>

        <SubmitButton isPending={isPending} />
      </form>
    </FormProvider>
  );
};
