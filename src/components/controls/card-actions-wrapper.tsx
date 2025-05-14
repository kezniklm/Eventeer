import React from "react";

export const CardActionsWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute right-0 bottom-[50%] m-4 flex translate-x-13 translate-y-10 flex-col gap-2 transition duration-300 group-hover:opacity-100 lg:opacity-0">
    {children}
  </div>
);
