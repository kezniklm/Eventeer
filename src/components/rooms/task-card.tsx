"use client";

import { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toggleSubtaskAction } from "@/server-actions/subtasks";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

type Subtask = { id: number; name: string; is_done: boolean };
type TaskCardProps = {
  id: number;
  name: string;
  description?: string;
  subtasks: Subtask[];
  users: string[];
  date?: string;
  author?: string;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("sk-SK", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });

export const TaskCard = ({ name, description, subtasks, users, date, author }: TaskCardProps) => {
  const [items, setItems] = useState(subtasks);
  const doneCount = items.filter((s) => s.is_done).length;
  const progress = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  const handleToggle = async (subtaskId: number, checked: boolean) => {
    setItems(items.map((s) => (s.id === subtaskId ? { ...s, is_done: checked } : s)));
    await toggleSubtaskAction(subtaskId, checked);
  };

  return (
    <Card className="bg-secondary animate-fade-in-slow w-full space-y-4 p-4">
      <CardHeader className="flex items-start justify-between">
        <div>
          <CardTitle className="text-2xl">{name}</CardTitle>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
        <div className="text-muted-foreground text-right text-xs">
          {date && <span className="mt-1">{formatDate(date)}</span>}
          {author && <div className="mt-1">By: {author}</div>}
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
