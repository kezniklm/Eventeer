"use client";

import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type SettleUpForm } from "@/db/zod/event";
import { useRoomContext } from "@/context/room-context";

import { FormInput } from "../ui/form-input";

export const CreateSettleUpForm = () => {
  const form = useForm<SettleUpForm>();
  const _roomInfo = useRoomContext();

  return (
    <FormProvider {...form}>
      <form>
        <div className="flex flex-col space-y-6">
          {/* Name */}
          <FormInput type="text" name="name" label="Name" placeholderAsLabel />

          {/* Description */}
          <FormInput type="text" name="description" label="Description" placeholderAsLabel />

          {/* Amount */}
          <FormInput type="number" name="amount" label="Amount" placeholderAsLabel />

          {/* Users */}
          <div className="grid w-full items-center gap-2">
            <Label>Users</Label>
            <div className="flex flex-wrap gap-4 px-2">
              <div className="flex gap-2">
                <Checkbox id="user1" />
                <Label className="text-xs text-gray-500" htmlFor="user1">
                  User1
                </Label>
              </div>
              <div className="flex gap-2">
                <Checkbox id="user2" />
                <Label className="text-xs text-gray-500" htmlFor="user2">
                  User2
                </Label>
              </div>
            </div>
          </div>

          {/* Priority */}
          <div className="grid w-full items-center gap-2">
            <Label>Priority</Label>
            <RadioGroup defaultValue="low" className="flex flex-wrap gap-4 px-2">
              <div className="flex gap-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="text-xs text-gray-500">
                  High
                </Label>
              </div>
              <div className="flex gap-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="text-xs text-gray-500">
                  Low
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Status */}
          <div className="grid w-full items-center gap-2">
            <Label>Status</Label>
            <RadioGroup defaultValue="public" className="flex flex-wrap gap-4 px-2">
              <div className="flex gap-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="text-xs text-gray-500">
                  Public
                </Label>
              </div>
              <div className="flex gap-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="text-xs text-gray-500">
                  Private
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button className="m-auto">Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};
