import { useMutation } from "@tanstack/react-query";

import { roomInsertSchema, type RoomInsertSchema } from "@/db/zod/room";
import { insertRoomAction } from "@/server-actions/rooms";

export const useInsertRoomMutation = () =>
  useMutation({
    mutationFn: async ({ data }: { data: RoomInsertSchema }) => {
      const insertedRoom = await insertRoomAction(data);

      return roomInsertSchema.parse(insertedRoom);
    }
  });
