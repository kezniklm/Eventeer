"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRoomContext } from "@/context/room-context";
import { useUpdateSettleUpContext } from "@/context/settle-up-update-context";
import { priorityEnumSchema } from "@/db/zod/activity";
import { settleUpFormSchema, type SettleUpForm } from "@/db/zod/settle-up";
import { useCreateSettleUpMutation, useUpdateSettleUpMutation } from "@/hooks/mutations/settle-up";
import { firstLetterUppercase } from "@/lib/utils";

import { Button } from "../ui/button";
import { FormInput } from "../ui/form-input";
import { LoadingWheel } from "../ui/loader";

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
          <FormInput type="text" name="name" label="Name" placeholderAsLabel required />

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

          <Button className="m-auto" type="submit" disabled={isPending}>
            {isPending ? <LoadingWheel /> : "Submit"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
