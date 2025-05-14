"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
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
type PopupType = "task" | "event" | "settleup";

export const RoomDetailActions = ({ handleLeave, disabled = false }: Props) => {
  const [leavePopupOpen, setLeavePopupOpen] = useState(false);
  const [burgerMenuOpened, setBurgerMenuOpened] = useState(false);
  const [formOpened, setFormOpened] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>("task");

  const onConfirmLeave = async () => {
    setLeavePopupOpen(false);
    if (handleLeave) {
      await handleLeave();
    }
  };

  const handleCreateClick = (popupType: PopupType) => {
    setPopupType(popupType);
    setFormOpened(true);

    if (burgerMenuOpened) setBurgerMenuOpened(false);
  };

  const handleLeaveClick = () => {
    setLeavePopupOpen(true);

    if (burgerMenuOpened) setBurgerMenuOpened(false);
  };

  return (
    <>
      <PopupForm type={popupType} setType={setPopupType} isOpened={formOpened} setIsOpened={setFormOpened} />
      <ResponsiveActionButtons isOpened={burgerMenuOpened} setIsOpened={setBurgerMenuOpened}>
        <Button onClick={() => handleCreateClick("task")} size="sm" disabled={disabled}>
          Create task
        </Button>
        <Button onClick={() => handleCreateClick("event")} size="sm" disabled={disabled}>
          Create event
        </Button>
        <Button onClick={() => handleCreateClick("settleup")} size="sm" disabled={disabled}>
          Create Settle Up
        </Button>
        <Button onClick={() => handleLeaveClick()} variant="destructive" size="sm" disabled={disabled}>
          Leave room
        </Button>
        <AlertDialog open={leavePopupOpen} onOpenChange={setLeavePopupOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Leave</AlertDialogTitle>
              <AlertDialogDescription>Are you sure you want to leave this room?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="secondary" onClick={() => setLeavePopupOpen(false)}>
                No, stay
              </Button>
              <AlertDialogAction onClick={onConfirmLeave}>Yes, leave</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ResponsiveActionButtons>
    </>
  );
};
