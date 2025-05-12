"use client";

import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { roomInsertSchema, type RoomInsertSchema } from "@/db/zod/room";
import { LoadingWheel } from "@/components/ui/loader";
import { FormInput } from "@/components/ui/form-input";
import type { UserSchema } from "@/db/zod/user";
import { useInsertRoomMutation } from "@/hooks/mutations/room";

type CreateRoomFormProps = {
  user: UserSchema;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateRoomForm = ({ user, setOpen }: CreateRoomFormProps) => {
  const { isPending, mutateAsync } = useInsertRoomMutation();
  const form = useForm<RoomInsertSchema>({
    resolver: zodResolver(roomInsertSchema),
    defaultValues: {
      name: "",
      description: "",
      owner: user.id,
      link: ""
    }
  });

  const onSubmit = (values: RoomInsertSchema) => {
    mutateAsync(
      { data: { ...values, link: encodeURIComponent(values.link) } },
      {
        onSuccess: () => {
          toast.success("Room successfully created!");
          setOpen(false);
        },
        onError: (error) => {
          toast.error(`Error occurred during saving: ${error.message}`);
        }
      }
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
        {/* Name */}
        <FormInput label="Name" type="text" name="name" />

        {/* Description */}
        <FormInput label="Description" type="text" name="description" />

        {/* Link */}
        <FormInput label="Link" type="text" name="link" />

        <Button type="submit" className="m-auto" disabled={isPending || !form.formState.isValid}>
          {isPending ? <LoadingWheel /> : "Create room"}
        </Button>
      </form>
    </FormProvider>
  );
};
