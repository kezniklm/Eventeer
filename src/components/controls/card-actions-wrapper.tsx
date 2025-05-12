import React from "react";

export const CardActionsWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute right-0 bottom-0 m-4 flex flex-row gap-2">{children}</div>
);
