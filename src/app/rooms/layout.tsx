import { type ReactNode } from "react";

const RoomLayout = ({ children }: { children: ReactNode }) => (
  <div className="m-auto w-full space-y-6 lg:max-w-7xl">{children} </div>
);

export default RoomLayout;
