import { useMutation } from "@tanstack/react-query";

import { PROFILE_PICTURE_MAX_SIZE, userProfileSchema, type UserProfileSchema } from "@/db/zod/user";
import { updateProfileAction, updateProfilePictureAction } from "@/server-actions/user";

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({ data }: { data: UserProfileSchema }) => {
      const updatedProfile = await updateProfileAction(data);

      return userProfileSchema.parse(updatedProfile);
    }
  });

export const useUpdateProfilePictureMutation = () =>
  useMutation({
    mutationFn: async (file: File) => {
      if (file.size >= PROFILE_PICTURE_MAX_SIZE) {
        throw new Error("Exceeded maximum file size (4 MB)!");
      }

      await updateProfilePictureAction(file);
    }
  });
