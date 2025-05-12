"use client";
import { useState } from "react";

import type { UserSchema } from "@/db/zod/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { CreateRoomForm } from "@/components/room/create-room-form";
import { Button } from "@/components/ui/button";

type CreateRoomFormProps = {
  user: UserSchema;
};

export const CreateRoomPopup = ({ user }: CreateRoomFormProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="w-full">
          Create room
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-secondary max-h h-fit overflow-auto">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div className="mx-auto w-full max-w-sm rounded-md bg-white p-4 shadow-2xl">
          <CreateRoomForm user={user} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
