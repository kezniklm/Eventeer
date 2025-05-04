import { useMutation } from "@tanstack/react-query";

import { userProfileSchema, type UserProfileSchema } from "@/db/zod/auth";
import { updateProfileAction } from "@/server-actions/user";

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({ data, userID }: { data: UserProfileSchema; userID: string }) => {
      const updatedProfile = await updateProfileAction(data, userID);

      return userProfileSchema.parse(updatedProfile);
    }
  });
