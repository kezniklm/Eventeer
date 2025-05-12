"use client";

import { useState, type Dispatch, type SetStateAction } from "react";

import { CreateEventForm } from "@/components/forms/create-event-form";
import { CreateTaskForm } from "@/components/forms/create-task-form";
import { CreateSettleUpForm } from "@/components/forms/create-settleup-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PopupFormProps = React.PropsWithChildren & {
  type: "task" | "event" | "settleup";
  setType: Dispatch<SetStateAction<"task" | "event" | "settleup">>;
};

const PopupForm = ({ children, type, setType }: PopupFormProps) => {
  const [opened, setOpened] = useState(false);

  const handleClose = () => setOpened(false);

  return (
    <div className="space-x-10">
      <Dialog open={opened} onOpenChange={setOpened}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="bg-secondary h-[90vh] max-h-full overflow-auto">
          <DialogHeader>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <div className="mx-auto w-full max-w-sm rounded-md bg-white p-4 shadow-2xl">
            <Label className="mb-2">Type</Label>
            <Select onValueChange={(value: "task" | "event" | "settleup") => setType(value)} value={type}>
              <SelectTrigger className="mb-6 w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="settleup">Settle up</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {type === "task" && <CreateTaskForm />}
            {type === "event" && <CreateEventForm />}
            {type === "settleup" && <CreateSettleUpForm onSubmit={handleClose} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupForm;
