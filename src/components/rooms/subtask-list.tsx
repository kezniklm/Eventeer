"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { toggleSubtaskAction } from "@/server-actions/subtasks";

type Subtask = { id: number; name: string; is_done: boolean };

type SubtaskListProps = {
  subtasks: Subtask[];
};

export const SubtaskList = ({ subtasks }: SubtaskListProps) => {
  const handleToggle = async (subtaskId: number, checked: boolean) => {
    await toggleSubtaskAction(subtaskId, checked);
  };

  return (
    <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
      {subtasks.map((s) => (
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
  );
};
