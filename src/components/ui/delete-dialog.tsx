"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter
} from "@/components/ui/alert-dialog";

import { DeleteButton } from "../controls/delete-button";

import { Button } from "./button";

type DeleteDialogProps = {
  subject: string;
  onConfirm: () => void;
};

export const DeleteDialog = ({ subject, onConfirm }: DeleteDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DeleteButton />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to delete this {subject}?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            No
          </Button>
          <AlertDialogAction onClick={onConfirm}>Yes, delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
