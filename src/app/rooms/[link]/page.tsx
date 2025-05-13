import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getCurrentUser } from "@/auth";
import { RoomDetailLoadingSkeleton } from "@/components/room/room-detail-loading";
import { EventCard } from "@/components/rooms/event-card";
import { RoomDetailActionsWrapper } from "@/components/rooms/room-detail-actions-wrapper";
import { SettleUpCard } from "@/components/rooms/settleup-card";
import { TaskCard } from "@/components/rooms/task-card";
import { getActivitiesByRoom, getActivityUsersNames } from "@/repository/activity";
import { getAttendeesByActivity } from "@/repository/attendance";
import { getRoomByLink, isUserInRoom } from "@/repository/room";
import { getSubtasksByTask } from "@/repository/subtask";

export const metadata: Metadata = {
  title: "Room Details",
  description: "View detailed information about your room."
};

type RoomDetailPageProps = {
  params: Promise<{ link: string }>;
};

const ContentWrapper = ({ params }: RoomDetailPageProps) => (
  <Suspense fallback={<RoomDetailLoadingSkeleton />}>
    <RoomDetailPage params={params} />
  </Suspense>
);

const RoomDetailPage = async ({ params }: RoomDetailPageProps) => {
  const { link } = await params;
  const room = await getRoomByLink(link);
  if (!room) notFound();

  const user = await getCurrentUser();
  if (!user?.id) notFound();
  const userId = user.id;

  const allowed = await isUserInRoom(room.id, userId);
  if (!allowed) notFound();

  const { tasks, events, settleUps } = await getActivitiesByRoom(room.id);

  const tasksWithDetails = await Promise.all(
    tasks.map(async (t) => {
      const rawSubtasks = await getSubtasksByTask(t.taskId!);
      const subtasks = rawSubtasks.map((s) => ({
        id: s.id,
        name: s.name,
        is_done: Boolean(s.is_done)
      }));

      const rawUsers = await getActivityUsersNames(t.id);
      const assignedUserIds = rawUsers.map((u) => u.id!);
      const users = rawUsers.map((u) => u.name!);
      const date = t.timestamp ? new Date(t.timestamp).toISOString().slice(0, 10) : undefined;

      return {
        ...t,
        subtasks,
        users,
        assignedUserIds,
        date,
        author: t.author,
        isPublic: t.isPublic,
        repeatableType: t.repeatableType,
        repeatableValue: t.repeatableValue
      };
    })
  );

  const visibleTasks = tasksWithDetails.filter(
    (t) => (t.createdById === userId || t.isPublic) ?? t.assignedUserIds.includes(userId)
  );

  const eventsWithDetails = await Promise.all(
    events.map(async (e) => {
      const rawUsers = await getActivityUsersNames(e.id);
      const rawAtt = await getAttendeesByActivity(e.id);

      const users = rawUsers.map((u) => ({
        id: u.id,
        name: u.name!,
        willAttend: !!rawAtt.find((a) => a.fk_user_id === u.id!)?.will_attend
      }));
      const assignedUserIds = users.map((u) => u.id);

      return {
        ...e,
        users,
        dateTime: e.eventDateTime,
        place: e.eventPlace,
        assignedUserIds,
        author: e.author,
        isPublic: e.isPublic,
        repeatableType: e.repeatableType,
        repeatableValue: e.repeatableValue
      };
    })
  );

  const visibleEvents = eventsWithDetails.filter(
    (e) => (e.createdById === userId || e.isPublic) ?? e.assignedUserIds.includes(userId)
  );

  const settleUpsWithDetails = await Promise.all(
    settleUps.map(async (s) => {
      const users = await getActivityUsersNames(s.id);

      const assignedUserIds = users.map((u) => u.id!);

      const date = s.timestamp ? new Date(s.timestamp).toLocaleDateString("sk-SK") : undefined;

      return {
        ...s,
        users,
        assignedUserIds,
        total: s.settleMoney ?? 0,
        date,
        author: s.author,
        isPublic: s.isPublic,
        repeatableType: s.repeatableType,
        repeatableValue: s.repeatableValue
      };
    })
  );

  const visibleSettleUps = settleUpsWithDetails.filter(
    (s) => (s.createdById === userId || s.isPublic) ?? s.assignedUserIds.includes(userId)
  );

  return (
    <>
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">{room.name}</h1>
          <RoomDetailActionsWrapper roomId={room.id} userId={userId} />
        </div>
        {room.description && (
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">{room.description}</p>
        )}
      </header>

      {visibleTasks.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Tasks</h2>
          <div className="flex flex-col space-y-4">
            {visibleTasks.map((t) => (
              <TaskCard
                key={t.id}
                id={t.taskId!}
                name={t.name}
                description={t.description ?? undefined}
                subtasks={t.subtasks}
                users={t.users}
                date={t.date}
                author={t.author!}
                isPublic={t.isPublic}
                repeatableType={t.repeatableType ?? undefined}
                repeatableValue={t.repeatableValue}
              />
            ))}
          </div>
        </section>
      )}

      {visibleEvents.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Events</h2>
          <div className="flex flex-col space-y-4">
            {visibleEvents.map((e) => (
              <EventCard
                key={e.id}
                name={e.name}
                place={e.place!}
                description={e.description ?? undefined}
                createdAt={e.createdAt ?? undefined}
                dateTime={e.dateTime ?? undefined}
                author={e.author!}
                users={e.users}
                isPublic={e.isPublic}
                repeatableType={e.repeatableType ?? undefined}
                repeatableValue={e.repeatableValue}
                eventId={e.id}
                priority={e.priority}
              />
            ))}
          </div>
        </section>
      )}

      {visibleSettleUps.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Settle Ups</h2>
          <div className="flex flex-col space-y-4">
            {visibleSettleUps.map((s) => (
              <SettleUpCard
                key={s.id}
                settleUpId={s.settleUpId!}
                name={s.name}
                description={s.description ?? undefined}
                date={s.date}
                author={s.author!}
                money={s.total}
                isPublic={s.isPublic}
                users={s.users}
                repeatableType={s.repeatableType ?? undefined}
                repeatableValue={s.repeatableValue ?? undefined}
                priority={s.priority}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default ContentWrapper;
