import { type z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import { room } from "../schema/room";

export const roomInsertSchema = createInsertSchema(room);
export type RoomInsertSchema = z.infer<typeof roomInsertSchema>;
