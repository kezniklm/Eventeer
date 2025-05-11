import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { room } from "../schema/room";

export const roomInfoSchema = createSelectSchema(room).pick({ id: true, name: true, description: true });
export type RoomInfo = z.infer<typeof roomInfoSchema>;
