import { eq } from "drizzle-orm";

import { db } from "@/db";
import { roomActivity, settleUp, userHasActivity } from "@/db/schema/activity";
import { type SettleUpInsertSchema } from "@/db/zod/settle-up";
import { type UserIdNamePair } from "@/db/zod/user";

export const getSettleUpsByRoom = async (roomId: number) =>
  await db.select().from(settleUp).where(eq(settleUp.roomId, roomId));

export const createSettleUp = async (data: SettleUpInsertSchema, users: UserIdNamePair[]) =>
  db.transaction(async (tx) => {
    const [inserted] = await tx
      .insert(settleUp)
      .values({
        roomId: data.roomId,
        name: data.name,
        description: data.description,
        authorId: data.authorId,
        date: data.date,
        money: data.money,
        priority: data.priority,
        isPublic: data.isPublic
      })
      .returning();

    const [activity] = await tx
      .insert(roomActivity)
      .values({
        fk_settle_up: inserted.id,
        name: data.name,
        description: data.description,
        created_by: data.authorId,
        fk_room: data.roomId
      })
      .returning();

    if (users.length !== 0) {
      const usersWithSettleUp = users.map((user) => ({ fk_user_id: user.id, fk_activity_id: activity.id }));
      tx.insert(userHasActivity).values([...usersWithSettleUp]);
    }

    return inserted;
  });
