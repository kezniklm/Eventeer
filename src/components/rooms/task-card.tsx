"use client";

import { useState } from "react";
import { type User } from "next-auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toggleSubtaskAction } from "@/server-actions/subtasks";

type Subtask = { id: number; name: string; is_done: boolean };
type TaskCardProps = {
  id: number;
  name: string;
  isPublic: boolean;
  description?: string;
  subtasks: Subtask[];
  users: string[];
  date?: string;
  author?: User;
  repeatableType?: string;
  repeatableValue?: boolean | null;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("sk-SK", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });

export const TaskCard = ({
  name,
  description,
  subtasks,
  users,
  date,
  author,
  isPublic,
  repeatableType,
  repeatableValue
}: TaskCardProps) => {
  const [items, setItems] = useState(subtasks);
  const doneCount = items.filter((s) => s.is_done).length;
  const progress = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  const handleToggle = async (subtaskId: number, checked: boolean) => {
    setItems(items.map((s) => (s.id === subtaskId ? { ...s, is_done: checked } : s)));
    await toggleSubtaskAction(subtaskId, checked);
  };

  return (
    <Card className="bg-secondary animate-fade-in-slow w-full space-y-4">
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
                repeatableType === "day"
                  ? "bg-indigo-300 text-indigo-800"
                  : repeatableType === "week"
                    ? "bg-indigo-200 text-indigo-800"
                    : repeatableType === "month"
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
        <div className="text-accent-foreground text-right text-xs">
          {date && <span className="mt-1">{formatDate(date)}</span>}
          {author && <div className="mt-1">By: {author.name}</div>}
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-3 flex flex-wrap gap-2">
          {users.map((u) => (
            <Button key={u} variant="outline">
              {u}
            </Button>
          ))}
        </div>
        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <li key={s.id} className="flex items-center">
              <Checkbox
                title={s.is_done ? "Mark subtask as in progress" : "Mark task as done"}
                checked={s.is_done}
                onCheckedChange={(val) => handleToggle(s.id, Boolean(val))}
                className={!s.is_done ? "border-input rounded-sm border bg-white" : ""}
              />
              <span className={`ml-2 ${s.is_done ? "text-muted-foreground line-through" : ""}`}>{s.name}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Progress value={progress} className="h-2 rounded-full" />
          <div className="text-right text-xs">{progress}%</div>
        </div>
      </CardContent>
    </Card>
  );
};
