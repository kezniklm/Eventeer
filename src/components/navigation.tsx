"use client";
import { Menu, X } from "lucide-react";
import React, { ButtonHTMLAttributes, type ReactElement, useState } from "react";

import { NavigationLink } from "@/components/navigation-link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { Button } from "./ui/button";

type NavigationProps = React.PropsWithChildren;

export const Navigation = ({ children }: NavigationProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    if (!open) return;
    setOpen(false);
  };

  return (
    <nav className="navbar sticky top-0 z-50 bg-white">
      <div className="mx-auto px-2 py-2 sm:max-w-4/5 sm:px-4">
        <div className="relative flex h-16 items-center justify-between">
          <NavigationLink href="/" className="text-3xl font-bold">
            Eventeer
          </NavigationLink>
          <Collapsible className="md:hidden" open={open} onOpenChange={(open) => setOpen(open)}>
            <CollapsibleTrigger>{open ? <X /> : <Menu />}</CollapsibleTrigger>
            <CollapsibleContent className="fixed inset-0 top-20 h-[calc(100dvh-80px)] w-screen">
              <div className="flex h-full flex-col gap-2.5 bg-[#bdd1d2] p-8">
                {React.Children.map(children, (child) => {
                  if (React.isValidElement(child)) {
                    return React.cloneElement(child as ReactElement<{ onClick?: () => void }>, {
                      onClick: handleClose
                    });
                  }
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
          <div className="ml-8 hidden gap-x-2 sm:gap-x-4 md:flex">{children}</div>
        </div>
      </div>
    </nav>
  );
};
