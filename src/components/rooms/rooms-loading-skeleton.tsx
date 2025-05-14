import { RoomCreateButton } from "../room/create-room-popup";
import { CardsLoadingSkeleton } from "../loading/cards-loading-skeleton";

export const RoomsLoadingSkeleton = () => (
  <>
    <div className="flex flex-row justify-between px-2">
      <h1 className="text-center text-6xl">Rooms</h1>
      <div className="space-x-10">
        <RoomCreateButton disabled />
      </div>
    </div>
    <div className="grid min-w-full grid-cols-1 gap-6">
      <CardsLoadingSkeleton />
      <CardsLoadingSkeleton />
      <CardsLoadingSkeleton />
      <CardsLoadingSkeleton />
    </div>
  </>
);
