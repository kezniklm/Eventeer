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

import PopupForm from "../pop-up-form";

import { ResponsiveActionButtons } from "./responsive-action-buttons";

type Props = {
  handleLeave: () => Promise<void>;
};

export const RoomDetailActions = ({ handleLeave }: Props) => {
  const [open, setOpen] = useState(false);
  const [popupType, setPopupType] = useState<"task" | "event" | "settleup">("task");

  const onConfirmLeave = async () => {
    setOpen(false);
    await handleLeave();
  };

  return (
    <ResponsiveActionButtons>
      <PopupForm type={popupType} setType={setPopupType}>
        <Button onClick={() => setPopupType("task")} size="sm">
          Create task
        </Button>
      </PopupForm>
      <PopupForm type={popupType} setType={setPopupType}>
        <Button onClick={() => setPopupType("event")} size="sm">
          Create event
        </Button>
      </PopupForm>
      <PopupForm type={popupType} setType={setPopupType}>
        <Button onClick={() => setPopupType("settleup")} size="sm">
          Create Settle Up
        </Button>
      </PopupForm>

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
