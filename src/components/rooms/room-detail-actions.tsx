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

type PropsDisabled = {
  disabled: true;
  handleLeave?: never;
};

type PropsEnabled = {
  disabled?: false;
  handleLeave: () => Promise<void>;
};

type Props = PropsDisabled | PropsEnabled;

export const RoomDetailActions = ({ handleLeave, disabled = false }: Props) => {
  const [open, setOpen] = useState(false);
  const [popupType, setPopupType] = useState<"task" | "event" | "settleup">("task");

  const onConfirmLeave = async () => {
    setOpen(false);
    if (handleLeave) {
      await handleLeave();
    }
  };

  return (
    <ResponsiveActionButtons>
      <PopupForm type={popupType} setType={setPopupType}>
        <Button onClick={() => setPopupType("task")} size="sm" disabled={disabled}>
          Create task
        </Button>
      </PopupForm>
      <PopupForm type={popupType} setType={setPopupType}>
        <Button onClick={() => setPopupType("event")} size="sm" disabled={disabled}>
          Create event
        </Button>
      </PopupForm>
      <PopupForm type={popupType} setType={setPopupType}>
        <Button onClick={() => setPopupType("settleup")} size="sm" disabled={disabled}>
          Create Settle Up
        </Button>
      </PopupForm>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" disabled={disabled}>
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
