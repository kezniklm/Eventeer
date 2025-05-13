"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRoomContext } from "@/context/room-context";
import { useUpdateSettleUpContext } from "@/context/settle-up-update-context";
import { periodEnum } from "@/db/schema/activity";
import { priorityEnumSchema } from "@/db/zod/activity";
import { settleUpFormSchema, type SettleUpForm } from "@/db/zod/settle-up";
import { useCreateSettleUpMutation, useUpdateSettleUpMutation } from "@/hooks/mutations/settle-up";
import { firstLetterUppercase } from "@/lib/utils";

import { FormInput } from "../ui/form-input";

import { SubmitButton } from "./submit-button";

type FormProps = {
  onSubmit: () => void;
};

export const CreateSettleUpForm = ({ onSubmit }: FormProps) => {
  const updateData = useUpdateSettleUpContext();

  const form = useForm<SettleUpForm>({
    resolver: zodResolver(settleUpFormSchema),
    defaultValues: updateData?.data
  });
  const { users, room } = useRoomContext();
  const createMutation = useCreateSettleUpMutation();
  const updateMutation = useUpdateSettleUpMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const repeatableValue = useWatch({
    control: form.control,
    name: "repeatableValue",
    defaultValue: updateData?.data.repeatableValue ?? false
  });

  const handleCreate = (data: SettleUpForm) => {
    createMutation.mutate(
      { roomId: room.id, data },
      {
        onSuccess: (data) => {
          toast.success(`Settle Up ${data.name} created!`);
          setTimeout(onSubmit, 500);
        },
        onError: (error) => toast.error(`Failed to create Settle Up: ${error.message}`)
      }
    );
  };

  const handleUpdate = (data: SettleUpForm, settleUpId: number) => {
    updateMutation.mutate(
      { data, settleUpId, roomId: room.id },
      {
        onSuccess: (data) => {
          toast.success(`Settle Up ${data.name} updated!`);
          setTimeout(onSubmit, 500);
        },
        onError: (error) => toast.error(`Failed to update Settle Up: ${error.message}`)
      }
    );
  };

  const handleSubmit = (data: SettleUpForm) => {
    if (updateData) {
      handleUpdate(data, updateData.settleUpId);
    } else {
      handleCreate(data);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col space-y-6">
          {/* Name */}
          <FormInput type="text" name="name" label="Name" placeholderAsLabel />

          {/* Description */}
          <FormInput type="text" name="description" label="Description" placeholderAsLabel />

          {/* Amount */}
          <FormInput type="number" name="money" label="Amount" placeholderAsLabel />

          {users?.length !== 0 && (
            <div className="grid w-full items-center gap-2">
              <Label>Users</Label>
              {users.map((userItem) => (
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
                              ? field.onChange([...(field?.value ?? []), userItem])
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
          )}

          {/* Priority */}
          <Controller
            control={form.control}
            name="priority"
            defaultValue={updateData?.data.priority ?? priorityEnumSchema.Enum.NORMAL}
            render={({ field: { value, onChange } }) => (
              <div className="grid w-full items-center gap-2">
                <Label>Priority</Label>
                <RadioGroup
                  defaultValue={value ?? priorityEnumSchema.Enum.NORMAL}
                  className="flex flex-wrap gap-4 px-2"
                  onValueChange={onChange}
                >
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
            defaultValue={updateData?.data.isPublic ?? false}
            render={({ field: { onChange, value } }) => (
              <div className="grid w-full items-center gap-2">
                <Label>Status</Label>
                <RadioGroup
                  defaultValue={value === true ? "true" : "false"}
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
            defaultValue={updateData?.data.repeatableType ?? (repeatableValue ? "WEEKLY" : null)}
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

          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </FormProvider>
  );
};
