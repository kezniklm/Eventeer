import { type User } from "next-auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCurrentUser } from "@/auth";
import { type TaskForm } from "@/db/zod/task";
import { type PeriodEnum, type PriorityEnum } from "@/db/zod/activity";

import { TaskCardControls } from "../controls/task/task-card-controLs";

import { SubtaskList } from "./subtask-list";

type Subtask = { id: number; name: string; is_done: boolean };

type TaskCardProps = {
  taskId: number;
  name: string;
  isPublic: boolean;
  description?: string;
  subtasks: Subtask[];
  users: { id: string; name: string }[];
  createdAt?: Date;
  dateTime?: Date;
  author?: User;
  repeatableType?: PeriodEnum;
  repeatableValue?: boolean | null;
  priority: PriorityEnum;
};

export const TaskCard = async ({
  taskId,
  name,
  description,
  dateTime,
  createdAt,
  subtasks,
  users,
  author,
  isPublic,
  priority,
  repeatableType,
  repeatableValue
}: TaskCardProps) => {
  const forUpdateData: TaskForm = {
    name,
    description: description!,
    isPublic,
    dateTime,
    users,
    priority,
    taskNames: subtasks.map((subtask) => ({
      name: subtask.name,
      dbId: subtask.id
    })),
    repeatableType: repeatableType ?? null,
    repeatableValue: repeatableValue ?? false
  };

  const { id } = await getCurrentUser();

  const doneCount = subtasks.filter((s) => s.is_done).length;
  const progress = subtasks.length ? Math.round((doneCount / subtasks.length) * 100) : 0;

  return (
    <Card className="bg-secondary animate-fade-in-slow group w-full space-y-4 p-4">
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
        <div className="text-accent-foreground text-right text-xs">
          {createdAt && <div>Created: {createdAt.toLocaleDateString("sk-SK")}</div>}
          {dateTime && <div className="mt-1">Due date: {dateTime.toLocaleDateString("sk-SK")}</div>}
          {author && <div className="mt-1">By: {author.name}</div>}
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-3 flex flex-wrap gap-2">
          {users.map((u) => (
            <Button key={u.id} variant="outline">
              {u.name}
            </Button>
          ))}
        </div>

        <SubtaskList subtasks={subtasks} />

        {subtasks.length > 0 && (
          <div className="mt-4">
            <Progress value={progress} className="h-2 rounded-full" />
            <div className="text-right text-xs">{progress}%</div>
          </div>
        )}
        <TaskCardControls taskId={taskId} userId={id} author={author} forUpdateData={forUpdateData} />
      </CardContent>
    </Card>
  );
};
