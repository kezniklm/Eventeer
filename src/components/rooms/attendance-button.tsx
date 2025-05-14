"use client";

import { toggleAttendanceAction } from "@/server-actions/attendance";

import { AnimatedCheckButton } from "../controls/animated-check-button";

type AttendanceUser = { id: string; name: string; willAttend: boolean };

type AttendanceButtonProps = {
  user: AttendanceUser;
  activityId: number;
};

export const AttendanceButton = ({ user, activityId }: AttendanceButtonProps) => (
  <AnimatedCheckButton
    onClick={() => toggleAttendanceAction(user.id, activityId, !user.willAttend)}
    showCheck={user.willAttend}
  >
    {" "}
    {user.name}
  </AnimatedCheckButton>
);
