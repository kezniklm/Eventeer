"use client";

import { MapPin, Check } from "lucide-react";
import { type User } from "next-auth";

import { type PriorityEnum } from "@/db/zod/activity";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toggleAttendanceAction } from "@/server-actions/attendance";

type EventCardProps = {
  id: number;
  name: string;
  description?: string;
  isPublic: boolean;
  date?: string;
  author?: User;
  users?: { id: string; name: string; willAttend: boolean }[];
  place?: string;
  repeatableType?: string;
  repeatableValue?: boolean | null;
  priority: PriorityEnum;
};

export const EventCard = ({
  id,
  name,
  description,
  isPublic,
  date,
  author,
  users = [],
  place,
  repeatableType,
  priority,
  repeatableValue
}: EventCardProps) => (
  <Card className="bg-secondary animate-fade-in-slow space-y-4 p-4">
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
          <>
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
            <span
              className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs ${
                priority === "HIGH"
                  ? "bg-red-100 text-red-800"
                  : priority === "NORMAL"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-green-100 text-green-800"
              } `}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}
            </span>
          </>
        )}
      </div>
      <div className="text-muted-foreground text-right text-xs">
        {date && <div>{date}</div>}
        {author && <div className="mt-1">By: {author.name}</div>}
      </div>
    </CardHeader>

    <CardContent className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {users.map((u) => (
          <Button
            key={u.id}
            variant="outline"
            size="sm"
            onClick={() => toggleAttendanceAction(u.id, id, !u.willAttend)}
          >
            {u.name}
            {u.willAttend && <Check className="ml-1 h-4 w-4 text-green-500" />}
          </Button>
        ))}
      </div>

      {place && (
        <Button className="mt-2 flex items-center gap-1" variant="outline" size="sm">
          <MapPin className="h-4 w-4" />
          {place}
        </Button>
      )}
    </CardContent>
  </Card>
);
