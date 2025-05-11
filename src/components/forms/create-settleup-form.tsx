"use client";

import { Controller, FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type SettleUpForm } from "@/db/zod/event";
import { useRoomContext } from "@/context/room-context";

import { FormInput } from "../ui/form-input";

export const CreateSettleUpForm = () => {
  const form = useForm<SettleUpForm>();
  const roomInfo = useRoomContext();

  const onSubmit = (data: SettleUpForm) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-6">
          {/* Name */}
          <FormInput type="text" name="name" label="Name" placeholderAsLabel />

          {/* Description */}
          <FormInput type="text" name="description" label="Description" placeholderAsLabel />

          {/* Amount */}
          <FormInput type="number" name="amount" label="Amount" placeholderAsLabel />

          {/* Users */}
          {roomInfo.users.map((userItem) => (
            <Controller
              key={userItem.id}
              control={form.control}
              name="users"
              render={({ field }) => (
                <div className="grid w-full items-center gap-2">
                  <Label>Users</Label>
                  <div className="flex flex-wrap gap-4 px-2">
                    <div className="flex gap-2">
                      <Checkbox
                        aria-checked
                        checked={field.value?.find((value) => value.id === userItem.id) ? true : false}
                        onCheckedChange={(checked) =>
                          checked
                            ? field.onChange([...(field.value ?? []), userItem])
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
            render={({ field }) => (
              <div className="grid w-full items-center gap-2">
                <Label>Priority</Label>
                <RadioGroup defaultValue="low" className="flex flex-wrap gap-4 px-2" onChange={field.onChange}>
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
            )}
          />

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

          <Button className="m-auto" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
