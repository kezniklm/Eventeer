"use client";

import { useEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import DefaultIcon from "@/../public/profile-icon.jpg";
import { type UserSchema } from "@/db/zod/auth";

type ProfilePictureProps = {
  user: UserSchema;
};

const acceptsTypes = ["image/png", "image/jpg", "image/jpeg"];

const uploadFormSchema = z.object({
  profilePicture: z.unknown().refine(
    (files) => {
      // Cannot use z.instanceof(FileList) because it causes errors during build (FileList is not defined type on server...)
      if (!(files instanceof FileList)) {
        return false;
      }

      if (files.length !== 1) {
        // Ignore length validation - don't want to see error message right after opening the file picker
        return true;
      }

      return acceptsTypes.includes((files as FileList)?.[0]?.type);
    },
    {
      message: "Invalid file type"
    }
  )
});

type FormSchema = z.infer<typeof uploadFormSchema>;

export const ProfilePicture = ({ user }: ProfilePictureProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(uploadFormSchema)
  });
  const {
    formState: { errors }
  } = form;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = ({ profilePicture }: FormSchema) => {
    if (profilePicture instanceof FileList && profilePicture.length === 1) {
      console.log(profilePicture); // TODO: upload handling
    }
  };

  useEffect(() => {
    if (errors.profilePicture) {
      toast.error(errors.profilePicture.message);
    }
  }, [errors]);

  const userImageSource = user.image ?? DefaultIcon;
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} onChange={form.handleSubmit(onSubmit)}>
        <HiddenInput ref={inputRef} />
        <button
          className="group relative float-end m-5 mt-3 mr-3 h-[125px] w-[125px] cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <Image
            src={userImageSource}
            alt="Image"
            fill
            className="rounded-3xl transition duration-300 group-hover:blur-xs"
          />
          <Pencil className="edit-icon absolute right-2 bottom-2 z-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>
      </form>
    </FormProvider>
  );
};

const HiddenInput = ({ ref }: { ref: RefObject<HTMLInputElement | null> }) => {
  const { register } = useFormContext<FormSchema>();
  return (
    <input
      type="file"
      accept={acceptsTypes.join(", ")}
      hidden
      {...register("profilePicture")}
      ref={(e) => {
        register("profilePicture").ref(e);
        ref.current = e;
      }}
    />
  );
};
