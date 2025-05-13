"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toggleAttendanceAction } from "@/server-actions/attendance";

type AttendanceUser = { id: string; name: string; willAttend: boolean };

type AttendanceButtonProps = {
  user: AttendanceUser;
  activityId: number;
};

export const AttendanceButton = ({ user, activityId }: AttendanceButtonProps) => (
  <Button
    key={user.id}
    variant="outline"
    size="sm"
    onClick={() => toggleAttendanceAction(user.id, activityId, !user.willAttend)}
  >
    {user.name}
    {user.willAttend && <Check className="ml-1 h-4 w-4 text-green-500" />}
  </Button>
);
