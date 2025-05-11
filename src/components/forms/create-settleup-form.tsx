"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRoomContext } from "@/context/room-context";
import { priorityEnumSchema } from "@/db/zod/activity";
import { settleUpFormSchema, type SettleUpForm } from "@/db/zod/settle-up";
import { firstLetterUppercase } from "@/lib/utils";

import { FormInput } from "../ui/form-input";

export const CreateSettleUpForm = () => {
  const form = useForm<SettleUpForm>({
    resolver: zodResolver(settleUpFormSchema)
  });
  const roomInfo = useRoomContext();

  const onSubmit = (data: SettleUpForm) => {
    console.log(data);
  };

  useEffect(() => console.log(form.formState.errors), [form.formState.errors]);

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
            defaultValue={false}
            render={({ field: { onChange } }) => (
              <div className="grid w-full items-center gap-2">
                <Label>Status</Label>
                <RadioGroup
                  defaultValue="false"
                  className="flex flex-wrap gap-4 px-2"
                  onValueChange={(event) => {
                    onChange(event === "true");
                  }}
                >
                  <div className="flex gap-2">
                    <RadioGroupItem value="true" id="status-public" />
                    <Label htmlFor="status-public" className="text-xs text-gray-500">
                      Public
                    </Label>
                  </div>
                  <div className="flex gap-2">
                    <RadioGroupItem value="false" id="status-private" />
                    <Label htmlFor="status-private" className="text-xs text-gray-500">
                      Private
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          />

          <Button className="m-auto" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
