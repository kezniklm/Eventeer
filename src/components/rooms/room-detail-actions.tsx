"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { ResponsiveActionButtons } from "./responsive-action-buttons";

type Props = {
  roomId: number;
  handleLeave: () => Promise<void>;
};

export const RoomDetailActions = ({ roomId, handleLeave }: Props) => {
  const [open, setOpen] = useState(false);

  const handleSettleUp = () => {
    console.log("Settle up in room", roomId);
  };
  const handleCreateEvent = () => {
    console.log("Create event in room", roomId);
  };
  const handleCreateTask = () => {
    console.log("Create task in room", roomId);
  };

  const onConfirmLeave = async () => {
    setOpen(false);
    await handleLeave();
  };

  return (
    <ResponsiveActionButtons>
      <Button variant="secondary" size="sm" onClick={handleSettleUp}>
        Settle up
      </Button>
      <Button variant="secondary" size="sm" onClick={handleCreateEvent}>
        Create event
      </Button>
      <Button variant="secondary" size="sm" onClick={handleCreateTask}>
        Create task
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            Leave room
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Leave</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to leave this room?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              No, stay
            </Button>
            <AlertDialogAction onClick={onConfirmLeave}>Yes, leave</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ResponsiveActionButtons>
  );
};
