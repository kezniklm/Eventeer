import { MapPin } from "lucide-react";
import { type User } from "next-auth";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/auth";
import { type EventForm } from "@/db/zod/event";
import { type PeriodEnum, type PriorityEnum } from "@/db/zod/activity";

import { EventCardControls } from "../controls/event/event-card-controls";

import { AttendanceButton } from "./attendance-button";

type EventCardProps = {
  eventId: number;
  name: string;
  description?: string;
  isPublic: boolean;
  createdAt?: Date;
  dateTime?: Date;
  author?: User;
  users?: { id: string; name: string; willAttend: boolean }[];
  place: string;
  repeatableType?: PeriodEnum;
  repeatableValue?: boolean | null;
  priority: PriorityEnum;
};

export const EventCard = async ({
  eventId,
  name,
  description,
  isPublic,
  dateTime,
  createdAt,
  author,
  users = [],
  place,
  repeatableType,
  repeatableValue,
  priority
}: EventCardProps) => {
  const forUpdateData: EventForm = {
    name,
    description: description!,
    isPublic,
    dateTime,
    users,
    priority,
    place,
    repeatableType: repeatableType ?? null,
    repeatableValue: repeatableValue ?? false
  };

  const { id } = await getCurrentUser();

  return (
    <Card className="bg-secondary animate-fade-in-slow group space-y-4 p-4">
      <CardHeader className="flex items-start justify-between">
        <div>
          <CardTitle className="text-2xl">{name}</CardTitle>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs ${isPublic ? "bg-green-100 text-green-800" : "bg-red-100 text-red-600"}`}
          >
            {isPublic ? "Public" : "Private"}
          </span>
          <span
            className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs ${
              repeatableValue !== undefined && repeatableValue !== null && repeatableValue
                ? "bg-purple-200 text-purple-800"
                : "bg-indigo-200 text-indigo-800"
            }`}
          >
            {repeatableValue !== undefined && repeatableValue !== null && repeatableValue ? "Repeatable" : "One-time"}
          </span>
          {repeatableValue !== undefined && repeatableValue !== null && repeatableValue && (
            <span
              className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs ${
                repeatableType === "DAILY"
                  ? "bg-indigo-300 text-indigo-800"
                  : repeatableType === "WEEKLY"
                    ? "bg-indigo-200 text-indigo-800"
                    : repeatableType === "MONTHLY"
                      ? "bg-purple-300 text-purple-800"
                      : "bg-purple-200 text-purple-800"
              }`}
            >
              {repeatableValue
                ? (repeatableType ?? "").charAt(0).toUpperCase() + (repeatableType ?? "").slice(1).toLowerCase()
                : `${repeatableValue} ${(repeatableType ?? "").toLowerCase()}s`}
            </span>
          )}
        </div>
        <div className="text-muted-foreground text-right text-xs">
          {createdAt && <div>Created: {createdAt.toLocaleDateString("sk-SK")}</div>}
          {dateTime && <div className="mt-1">Due date: {dateTime.toLocaleDateString("sk-SK")}</div>}
          {author && <div className="mt-1">By: {author.name}</div>}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {users.map((u) => (
            <AttendanceButton key={u.id} user={u} activityId={eventId} />
          ))}
        </div>

        {place && (
          <Button className="mt-2 flex items-center gap-1" variant="outline" size="sm">
            <MapPin className="h-4 w-4" />
            {place}
          </Button>
        )}
        <EventCardControls forUpdateData={forUpdateData} eventId={eventId} userId={id} author={author} />
      </CardContent>
    </Card>
  );
};
