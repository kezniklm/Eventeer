"use client";

import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Result } from "@/result";

type InviteUserFormProps = {
  onInvite: (invite: string) => Promise<Result>;
};

type UserInviteFormData = {
  invite: string;
};

export const InviteUserForm = ({ onInvite }: InviteUserFormProps) => {
  const { register, handleSubmit, reset } = useForm<UserInviteFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false
  });

  const mutation = useMutation<Result, Error, string>({
    mutationFn: onInvite,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      reset();
      toast.success(result.message);
    },
    onError: () => {
      toast.error("An unexpected error occurred");
    }
  });

  const onSubmit = (data: UserInviteFormData) => {
    mutation.mutate(data.invite);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        if (errors.invite?.message) {
          toast.error(errors.invite.message);
        }
      })}
      className="flex flex-col items-start gap-1"
    >
      <div className="flex items-center gap-2">
        <Input
          className="bg-tertiary border-tertiary h-9 w-40 text-sm placeholder-white"
          placeholder="Invite by email..."
          {...register("invite", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format"
            }
          })}
        />
        <Button
          type="submit"
          title="Invite user"
          className="bg-tertiary h-8 px-2"
          size="sm"
          variant="secondary"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Inviting..." : <Plus className="h-4 w-4" />}
        </Button>
      </div>
    </form>
  );
};
