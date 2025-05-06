"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const RoomActions = ({ roomId }: { roomId: number }) => {
  const router = useRouter();

  const handleSettleUp = () => {
    console.log("Settle up in room", roomId);
    // TODO
  };

  const handleCreateEvent = () => {
    console.log("CreateEvent in room", roomId);
    // TODO
  };

  const handleCreateTask = () => {
    console.log("CreateTask in room", roomId);
    // TODO
  };

  const handleLeave = async () => {
    if (!confirm("Naozaj chceš opustiť túto miestnosť?")) return;
    await fetch(`/api/rooms/${roomId}/leave`, { method: "POST" });
    router.push("/rooms");
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
      <Button variant="destructive" size="sm" onClick={handleLeave}>
        Leave
      </Button>
    </div>
  );
};
