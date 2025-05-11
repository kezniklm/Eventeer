"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRoomContext } from "@/context/room-context";
import { priorityEnumSchema } from "@/db/zod/activity";
import { settleUpFormSchema, type SettleUpForm } from "@/db/zod/settle-up";
import { useCreateSettleUpMutation } from "@/hooks/mutations/settle-up";
import { firstLetterUppercase } from "@/lib/utils";

import { Button } from "../ui/button";
import { FormInput } from "../ui/form-input";
import { LoadingWheel } from "../ui/loader";

type FormProps = {
  onSubmit: () => void;
};

export const CreateSettleUpForm = ({ onSubmit }: FormProps) => {
  const form = useForm<SettleUpForm>({
    resolver: zodResolver(settleUpFormSchema)
  });
  const roomInfo = useRoomContext();
  const mutation = useCreateSettleUpMutation();

  const handleSubmit = (data: SettleUpForm) => {
    mutation.mutate(
      { roomId: roomInfo.room.id, data },
      {
        onSuccess: (data) => {
          toast.success(`Settle Up ${data.name} created!`);
          setTimeout(onSubmit);
        },
        onError: (error) => toast.error(`Failed to create Settle Up: ${error.message}`)
      }
    );
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
            defaultValue={priorityEnumSchema.enum.NORMAL}
            render={({ field }) => (
              <div className="grid w-full items-center gap-2">
                <Label>Priority</Label>
                <RadioGroup
                  defaultValue={priorityEnumSchema.enum.NORMAL}
                  className="flex flex-wrap gap-4 px-2"
                  onChange={field.onChange}
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

          <Button className="m-auto" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? <LoadingWheel /> : "Submit"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
