import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { room } from "../schema/room";

import { type UserIdNamePair } from "./user";

export const roomSelectSchema = createSelectSchema(room);

export const roomInfoSchema = roomSelectSchema.pick({ id: true, name: true, description: true });

export type RoomInfo = {
  room: z.infer<typeof roomInfoSchema>;
  users: UserIdNamePair[];
};
