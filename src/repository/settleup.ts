import { and, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

import { db } from "@/db";
import { roomActivity, settleUp, userHasActivity, userSettledUp } from "@/db/schema/activity";
import { type SettleUpInsertSchema } from "@/db/zod/settle-up";
import { type UserIdNamePair } from "@/db/zod/user";

export const getSettleUpsByRoom = async (roomId: number) =>
  await db
    .select({
      activityId: roomActivity.id,
      name: roomActivity.name,
      description: roomActivity.description,
      isPublic: roomActivity.isPublic,
      priority: roomActivity.priority,
      authorId: roomActivity.created_by,
      timestamp: roomActivity.timestamp,
      createdAt: roomActivity.createdAt,
      money: settleUp.money
    })
    .from(roomActivity)
    .innerJoin(settleUp, eq(settleUp.id, roomActivity.fk_settle_up))
    .where(eq(roomActivity.fk_room, roomId));

export const createSettleUp = async (data: SettleUpInsertSchema, users?: UserIdNamePair[]) =>
  db.transaction(async (tx) => {
    console.log(users);
    const [inserted] = await tx
      .insert(settleUp)
      .values({
        roomId: data.roomId,
        money: data.money
      })
      .returning();

    const [activity] = await tx
      .insert(roomActivity)
      .values({
        fk_settle_up: inserted.id,
        fk_room: data.roomId,
        ...data
      })
      .returning();

    if (users && users.length !== 0) {
      const usersWithSettleUp = users.map((user) => ({ fk_user_id: user.id, fk_activity_id: activity.id }));
      await tx.insert(userHasActivity).values([...usersWithSettleUp]);
    }

    return { ...inserted, ...activity };
  });

export const updateSettleUp = async (data: SettleUpInsertSchema, settleUpId: number, users?: UserIdNamePair[]) =>
  db.transaction(async (tx) => {
    const [updated] = await tx
      .update(settleUp)
      .set({
        roomId: data.roomId,
        money: data.money
      })
      .where(eq(settleUp.id, settleUpId))
      .returning();

    const [activity] = await tx
      .update(roomActivity)
      .set(data)
      .where(eq(roomActivity.fk_settle_up, settleUpId))
      .returning();

    await tx.delete(userHasActivity).where(eq(userHasActivity.fk_activity_id, activity.id));
    if (users && users?.length !== 0) {
      const usersWithSettleUp = users?.map((user) => ({ fk_user_id: user.id, fk_activity_id: activity.id }));
      await tx.insert(userHasActivity).values([...usersWithSettleUp]);
    }

    return { ...updated, ...activity };
  });

export const deleteSettleUp = async (settleUpId: number) => {
  await db.transaction(async (tx) => {
    const rows = await tx.delete(roomActivity).where(eq(roomActivity.fk_settle_up, settleUpId));

    if (rows.rowsAffected !== 1) {
      throw new Error("Failed to delete settle up!");
    }

    const rowsSettleUp = await tx.delete(settleUp).where(eq(settleUp.id, settleUpId));

    if (rowsSettleUp.rowsAffected !== 1) {
      throw new Error("Failed to delete settle up!");
    }
  });
};

export const getSettleUpById = async (settleUpId: number) =>
  db
    .select()
    .from(settleUp)
    .innerJoin(roomActivity, eq(roomActivity.id, settleUpId))
    .where(eq(settleUp.id, settleUpId));

export const getAssignedUsers = async (settleUpId: number) =>
  db
    .select({ fk_user_id: userHasActivity.fk_user_id })
    .from(roomActivity)
    .innerJoin(userHasActivity, eq(userHasActivity.fk_activity_id, roomActivity.id))
    .where(eq(roomActivity.fk_settle_up, settleUpId));

export const toggleUserPaidMoney = async (settleUpId: number, userId: string) => {
  const specificRowFilter = and(eq(userSettledUp.fk_settle_up, settleUpId), eq(userSettledUp.fk_user, userId));

  await db.transaction(async (tx) => {
    const userPaid = await tx.$count(userSettledUp, specificRowFilter);

    if (userPaid === 0) {
      await tx.insert(userSettledUp).values({ fk_user: userId, fk_settle_up: settleUpId });
    } else {
      await tx.delete(userSettledUp).where(specificRowFilter);
    }
  });
};

export const getUserPaidMoney = async (settleUpId: number) => {
  "use cache";
  cacheTag("room-details", "activities", "settle-up", "user-paid");
  cacheLife("hours");

  return db.select().from(userSettledUp).where(eq(userSettledUp.fk_settle_up, settleUpId));
};
