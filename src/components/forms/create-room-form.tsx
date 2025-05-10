"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CreateRoomForm = () => (
  <div className="flex flex-col space-y-6">
    {/* Name */}
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="name">Name</Label>
      <Input type="name" id="name" placeholder="Name" />
    </div>

    {/* Description */}
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="description">Description</Label>
      <Input type="description" id="description" placeholder="Description" />
    </div>

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

    <Button className="m-auto">Create room</Button>
  </div>
);
