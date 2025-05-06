"use client";

import { useState } from "react";

import PopupForm from "@/components/pop-up-form";
import { Button } from "@/components/ui/button";

const Popupspage = () => {
  const [type, setType] = useState<"task" | "event" | "settleup">("task");
  return (
    <div className="space-x-10">
      <PopupForm type={type} setType={setType}>
        <Button onClick={() => setType("task")}>Create task</Button>
      </PopupForm>
      <PopupForm type={type} setType={setType}>
        <Button onClick={() => setType("event")}>Create event</Button>
      </PopupForm>
      <PopupForm type={type} setType={setType}>
        <Button onClick={() => setType("settleup")}>Create settleup</Button>
      </PopupForm>
    </div>
  );
};
export default Popupspage;
