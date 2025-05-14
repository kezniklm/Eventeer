"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { FormProvider, useForm, useFormContext, type FieldValues } from "react-hook-form";
import { toast } from "sonner";

import DefaultIcon from "@/../public/profile-icon.jpg";
import { profilePictureFileTypes, type UserSchema } from "@/db/zod/user";
import { useUpdateProfilePictureMutation } from "@/hooks/mutations/user";
import { cn } from "@/lib/utils";

type ProfilePictureProps = {
  user: UserSchema;
};

type ValidationResult = {
  isOk: boolean;
  message?: string;
};

export const ProfilePicture = ({ user }: ProfilePictureProps) => {
  const pictureMutation = useUpdateProfilePictureMutation();
  const form = useForm();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validate = (files: FileList): ValidationResult => {
    // Cannot use z.instanceof(FileList) because it causes errors during build (FileList is not defined type on server...)
    if (!(files instanceof FileList)) {
      return { isOk: false };
    }

    if (files.length === 0) {
      return { isOk: false };
    }

    if (files.length > 1) {
      return { isOk: false, message: "Only one file is allowed" };
    }

    if (!profilePictureFileTypes.includes(files[0].type)) {
      return { isOk: false, message: "Forbidden MIME type" };
    }

    return { isOk: true };
  };

  const onSubmit = (data: FieldValues) => {
    const filesEntry = data.profilePicture;
    if (!filesEntry) {
      return;
    }
    const files = filesEntry as FileList;

    const validation = validate(files);
    if (!validation.isOk) {
      if (validation.message) toast.error(validation.message);
      return;
    }
    pictureMutation.mutate(files[0], {
      onSuccess: () => {
        toast.success("Profile picture successfully updated!");
        form.reset();
      },
      onError: (error) => {
        toast.error(`Failed to update profile picture: ${error.message}`);
        form.reset();
      }
    });
  };

  const userImageSource = user.image ?? DefaultIcon;
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} onChange={form.handleSubmit(onSubmit)}>
        <HiddenInput ref={inputRef} />
        <button
          className={cn(
            "group relative float-end m-5 mt-3 mr-3 h-[125px] w-[125px]",
            pictureMutation.isPending ? "cursor-default" : "cursor-pointer"
          )}
          onClick={() => inputRef.current?.click()}
          disabled={pictureMutation.isPending}
        >
          <Image
            src={userImageSource}
            alt="Image"
            width={125}
            height={125}
            className={cn(
              "rounded-3xl transition duration-300",
              pictureMutation.isPending ? "blur-xs" : "group-hover:blur-xs"
            )}
          />
          {!pictureMutation.isPending && (
            <Pencil className="edit-icon absolute right-2 bottom-2 z-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          )}
        </button>
      </form>
    </FormProvider>
  );
};

const HiddenInput = ({ ref }: { ref: RefObject<HTMLInputElement | null> }) => {
  const { register } = useFormContext();
  return (
    <input
      type="file"
      accept={profilePictureFileTypes.join(", ")}
      hidden
      {...register("profilePicture")}
      ref={(e) => {
        register("profilePicture").ref(e);
        ref.current = e;
      }}
    />
  );
};
