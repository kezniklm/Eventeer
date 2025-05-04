import { useMutation } from "@tanstack/react-query";

import { userProfileSchema, type UserProfileSchema } from "@/db/zod/user";
import { updateProfileAction, updateProfilePictureAction } from "@/server-actions/user";

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({ data, userID }: { data: UserProfileSchema; userID: string }) => {
      const updatedProfile = await updateProfileAction(data, userID);

      return userProfileSchema.parse(updatedProfile);
    }
  });

export const useUpdateProfilePictureMutation = () =>
  useMutation({
    mutationFn: async (file: File) => {
      await updateProfilePictureAction(file);
    }
  });
