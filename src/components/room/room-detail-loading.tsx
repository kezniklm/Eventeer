"use client";

import { CardsLoadingSkeleton } from "../loading/cards-loading-skeleton";
import { TextLoadingSkeleton } from "../loading/text-loading-skeleton";
import { RoomDetailActions } from "../rooms/room-detail-actions";

export const RoomDetailLoadingSkeleton = () => (
  <>
    <header className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          <TextLoadingSkeleton />
        </h1>
        <RoomDetailActions disabled />
      </div>
    </header>
    <section>
      <div className="grid min-w-full grid-cols-1 gap-6">
        <TextLoadingSkeleton className="min-h-[3rem]" />
        <CardsLoadingSkeleton />
        <CardsLoadingSkeleton />
        <CardsLoadingSkeleton />
        <CardsLoadingSkeleton />
      </div>
    </section>
  </>
);
