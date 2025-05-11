import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { RoomDetailActionsWrapper } from "@/components/rooms/room-detail-actions-wrapper";
import { SettleUpCard } from "@/components/rooms/settleup-card";
import { TaskCard } from "@/components/rooms/task-card";
import { getActivitiesByRoom, getActivityUsersNames } from "@/repository/activity";
import { getRoomByLink, isUserInRoom } from "@/repository/room";
import { EventCard } from "@/components/rooms/event-card";
import { auth } from "@/auth";
import { getSubtasksByTask } from "@/repository/subtask";

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
      const isPublic = Boolean(t.taskIsPublic);
      const rawSubtasks = await getSubtasksByTask(t.id);
      const subtasks: { id: number; name: string; is_done: boolean }[] = rawSubtasks.map((s) => ({
        id: s.id,
        is_done: Boolean(s.is_done),
        name: s.name
      }));
      const rawUsers = await getActivityUsersNames(t.id);
      const assignedUserIds = rawUsers.map((u) => u.id!);
      const users = rawUsers.map((u) => u.name!);
      const dueDate = t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 10) : undefined;
      return {
        ...t,
        subtasks,
        users,
        assignedUserIds,
        dueDate,
        authorName: t.authorName ?? "Unknown",
        isPublic
      };
    })
  );
  const visibleTasks = tasksWithDetails.filter((t) => t.isPublic || t.assignedUserIds.includes(userId));
  const eventsWithDetails = await Promise.all(
    events.map(async (e) => {
      const isPublic = Boolean(e.eventIsPublic);
      const rawUsers = await getActivityUsersNames(e.id);
      const assignedUserIds = rawUsers.map((u) => u.id!);
      const users = rawUsers.map((u) => u.name!);
      const date = e.eventDateTime ? new Date(e.eventDateTime).toLocaleDateString("sk-SK") : undefined;
      return {
        ...e,
        users,
        date,
        author: e.authorName,
        assignedUserIds,
        place: e.eventPlace,
        isPublic
      };
    })
  );
  const visibleEvents = eventsWithDetails.filter((e) => e.isPublic || e.assignedUserIds.includes(userId));

  const settleUpsWithDetails = await Promise.all(
    settleUps.map(async (s) => {
      const isPublic = Boolean(s.settleUpIsPublic);
      const rawUsers = await getActivityUsersNames(s.id);
      const assignedUserIds = rawUsers.map((u) => u.id!);
      const users = rawUsers.map((u) => u.name!);
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
        assignedUserIds,
        author: s.authorName,
        isPublic
      };
    })
  );
  const visibleSettleUps = settleUpsWithDetails.filter((s) => s.isPublic || s.assignedUserIds.includes(userId));

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 md:space-y-10 md:px-8 lg:space-y-12 lg:px-12">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">{room.name}</h1>
          <RoomDetailActionsWrapper roomId={room.id} userId={userId} />
        </div>
        {room.description && (
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">{room.description}</p>
        )}
      </header>

      {tasksWithDetails.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Tasks</h2>
          <div className="flex flex-col space-y-4">
            {visibleTasks.map((t) => (
              <TaskCard
                key={t.id}
                id={t.id}
                name={t.name}
                description={t.description ?? undefined}
                subtasks={t.subtasks}
                users={t.users}
                date={t.dueDate}
                author={t.authorName}
                isPublic={t.isPublic}
              />
            ))}
          </div>
        </section>
      )}

      {eventsWithDetails.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Events</h2>
          <div className="flex flex-col space-y-4">
            {visibleEvents.map((e) => (
              <EventCard
                key={e.id}
                name={e.name}
                description={e.description ?? undefined}
                date={e.date}
                author={e.author ?? undefined}
                users={e.users}
                place={e.place ?? undefined}
                isPublic={e.isPublic}
              />
            ))}
          </div>
        </section>
      )}

      {settleUpsWithDetails.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Settle Ups</h2>
          <div className="flex flex-col space-y-4">
            {visibleSettleUps.map((s) => (
              <SettleUpCard
                key={s.id}
                name={s.name}
                description={s.description ?? undefined}
                date={s.date}
                author={s.author ?? undefined}
                transactions={s.transactions}
                total={s.total}
                isPublic={s.isPublic}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default RoomDetailPage;
