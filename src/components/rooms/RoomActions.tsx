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

export const RoomActions = ({ roomId }: { roomId: number }) => {
  const [open, setOpen] = useState(false);

  const handleSettleUp = () => {
    console.log("Settle up in room", roomId);
    // TODO: implement settle up logic
  };

  const handleCreateEvent = () => {
    console.log("Create event in room", roomId);
    // TODO: implement create event logic
  };

  const handleCreateTask = () => {
    console.log("Create task in room", roomId);
    // TODO: implement create task logic
  };

  const handleLeaveRoom = () => {
    console.log("Leaving room", roomId);
    setOpen(false); // Close the dialog after "Yes, leave"
    // TODO: implement leave room logic
  };

  return (
    <div className="flex flex-wrap gap-2">
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
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              No, I want to stay
            </Button>
            <AlertDialogAction onClick={handleLeaveRoom} type="button">
              Yes, leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
