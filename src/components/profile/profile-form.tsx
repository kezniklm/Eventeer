"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { LoadingWheel } from "@/components/ui/loader";
import { userProfileSchema, type UserProfileSchema, type UserSchema } from "@/db/zod/auth";
import { useUpdateProfileMutation } from "@/hooks/mutations/user";

type ProfileFormProps = {
  user: UserSchema;
};

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const { isPending, mutateAsync } = useUpdateProfileMutation();
  const form = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: user
  });

  const onSubmit = async (data: UserProfileSchema) => {
    mutateAsync(
      { data, userID: user.id },
      {
        onSuccess: () => {
          toast.success("Data successfully updated!");
        },
        onError: (error) => {
          toast.error(`Error occurred during saving: ${error.message}`);
        }
      }
    );
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-5 text-center"
      >
        <FormInput label="Email" type="text" name="email" disabled />
        <FormInput label="Name" type="text" name="name" />
        <FormInput label="Nickname" type="text" name="nickname" />
        <FormInput label="Description" type="text" name="description" />
        <Button type="submit" disabled={isPending || !form.formState.isValid}>
          {isPending ? <LoadingWheel /> : "Save"}
        </Button>
      </form>
    </FormProvider>
  );
};
