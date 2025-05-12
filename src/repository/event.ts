import { eq } from "drizzle-orm";

import { db } from "@/db";
import { event, roomActivity, userHasActivity } from "@/db/schema/activity";
import { type CreateEventSchema } from "@/db/zod/event";
import { type UserIdNamePair } from "@/db/zod/user";

export const getEventsByRoom = async (roomId: number) => await db.select().from(event).where(eq(event.roomId, roomId));

export const createEvent = async (data: CreateEventSchema, users: UserIdNamePair[]) =>
  db.transaction(async (tx) => {
    const [inserted] = await db
      .insert(event)
      .values({
        roomId: data.roomId,
        name: data.name,
        description: data.description,
        authorId: data.authorId,
        dateTime: data.dateTime,
        priority: data.priority,
        isPublic: data.isPublic,
        repeatableType: data.repeatableType,
        repeatableValue: data.repeatableValue,
        place: data.place
      })
      .returning();

    const [activity] = await tx
      .insert(roomActivity)
      .values({
        fk_event: inserted.id,
        name: data.name,
        description: data.description,
        created_by: data.authorId,
        fk_room: data.roomId
      })
      .returning();

    if (users.length !== 0) {
      const eventUsers = users.map((user) => ({ fk_user_id: user.id, fk_activity_id: activity.id }));
      tx.insert(userHasActivity).values([...eventUsers]);
    }

    return inserted;
  });
