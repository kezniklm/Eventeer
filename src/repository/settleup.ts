import { eq } from "drizzle-orm";

import { db } from "@/db";
import { roomActivity, settleUp, userHasActivity, userHasActivityRelations } from "@/db/schema/activity";
import { type SettleUpInsertSchema } from "@/db/zod/settle-up";
import { type UserIdNamePair } from "@/db/zod/user";

export const getSettleUpsByRoom = async (roomId: number) =>
  await db.select().from(settleUp).where(eq(settleUp.roomId, roomId));

export const createSettleUp = async (data: SettleUpInsertSchema, users: UserIdNamePair[]) =>
  db.transaction(async (tx) => {
    console.log(users);
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
      await tx.insert(userHasActivity).values([...usersWithSettleUp]);
    }

    return inserted;
  });

export const updateSettleUp = async (data: SettleUpInsertSchema, users: UserIdNamePair[], settleUpId: number) =>
  db.transaction(async (tx) => {
    const [updated] = await tx
      .update(settleUp)
      .set({
        roomId: data.roomId,
        name: data.name,
        description: data.description,
        authorId: data.authorId,
        date: data.date,
        money: data.money,
        priority: data.priority,
        isPublic: data.isPublic
      })
      .where(eq(settleUp.id, settleUpId))
      .returning();

    const [activity] = await tx
      .update(roomActivity)
      .set({
        fk_settle_up: updated.id,
        name: data.name,
        description: data.description,
        created_by: data.authorId,
        fk_room: data.roomId
      })
      .where(eq(roomActivity.fk_settle_up, settleUpId))
      .returning();

    await tx.delete(userHasActivity).where(eq(userHasActivity.fk_activity_id, activity.id));
    if (users.length !== 0) {
      const usersWithSettleUp = users.map((user) => ({ fk_user_id: user.id, fk_activity_id: activity.id }));
      await tx.insert(userHasActivity).values([...usersWithSettleUp]);
    }

    return updated;
  });
