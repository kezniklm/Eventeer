import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { RoomDetailActionsWrapper } from "@/components/rooms/room-detail-actions-wrapper";
import { SettleUpCard } from "@/components/rooms/settleup-card";
import { TaskCard } from "@/components/rooms/task-card";
import { getActivitiesByRoom } from "@/repository/activity";
import { getRoomByLink, isUserInRoom } from "@/repository/room";
import { EventCard } from "@/components/rooms/event-card";
import { auth } from "@/auth";
import { getSubtasksByTask } from "@/repository/subtask";
import { getRoomUsersNames } from "@/repository/rooms";

export const metadata: Metadata = {
  title: "Room Details",
  description: "View detailed information about your room."
};

type RoomDetailPageProps = {
  params: Promise<{ link: string }>;
};

const RoomDetailPage = async ({ params }: RoomDetailPageProps) => {
  const { link } = await params;
  const room = await getRoomByLink(link);
  if (!room) notFound();

  const session = await auth();
  if (!session?.user?.id) notFound();
  const userId = session.user.id;

  const allowed = await isUserInRoom(room.id, userId);
  if (!allowed) notFound();

  const { tasks, events, settleUps } = await getActivitiesByRoom(room.id);

  const tasksWithDetails = await Promise.all(
    tasks.map(async (t) => {
      const rawSubtasks = await getSubtasksByTask(t.id);
      const subtasks: { id: number; name: string; is_done: boolean }[] = rawSubtasks.map((s, i) => ({
        id: s.id,
        is_done: Boolean(s.is_done),
        name: s.name
      }));
      const users = await getRoomUsersNames(room.id); // Ensure users are fetched
      const dueDate = t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : undefined;
      return {
        ...t,
        subtasks,
        users,
        dueDate,
        authorName: t.authorName ?? "Unknown"
      };
    })
  );

  const eventsWithDetails = await Promise.all(
    events.map(async (e) => {
      const users = (await getRoomUsersNames(room.id)).map((u) => u.name!);
      const date = e.eventDateTime ? new Date(e.eventDateTime).toLocaleDateString("sk-SK") : undefined;
      return {
        ...e,
        users,
        date,
        author: e.authorName,
        place: e.eventPlace
      };
    })
  );

  const settleUpsWithDetails = await Promise.all(
    settleUps.map(async (s) => {
      const users = (await getRoomUsersNames(room.id)).map((u) => u.name!);
      const total = (s.settleMoney ?? 0).toString();
      const transactions = users.map((u) => ({
        user: u,
        amount: `${Math.ceil((s.settleMoney ?? 0) / users.length / 10) * 10}`
      }));
      const date = s.settleDate ? new Date(s.settleDate).toLocaleDateString("sk-SK") : undefined;
      return {
        ...s,
        transactions,
        total,
        date,
        author: s.authorName
      };
    })
  );

  return (
    <div className="space-y-12 p-4">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{room.name}</h1>
          <RoomDetailActionsWrapper roomId={room.id} userId={userId} />
        </div>
        {room.description && <p className="text-muted-foreground">{room.description}</p>}
      </header>

      {tasksWithDetails.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Tasks</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasksWithDetails.map((t) => (
              <TaskCard
                key={t.id}
                id={t.id}
                name={t.name}
                description={t.description ?? undefined}
                subtasks={t.subtasks}
                users={t.users.map((user) => user.name ?? "Unknown")}
                date={t.dueDate}
                author={t.authorName}
              />
            ))}
          </div>
        </section>
      )}

      {events.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Events</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eventsWithDetails.map((e) => (
              <EventCard
                key={e.id}
                name={e.name}
                description={e.description ?? undefined}
                date={e.date}
                author={e.author ?? undefined}
                users={e.users}
                place={e.place ?? undefined}
              />
            ))}
          </div>
        </section>
      )}

      {settleUps.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Settle Ups</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {settleUpsWithDetails.map((s) => (
              <SettleUpCard
                key={s.id}
                name={s.name}
                description={s.description ?? undefined}
                date={s.date}
                author={s.author ?? undefined}
                transactions={s.transactions}
                total={s.total}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default RoomDetailPage;
