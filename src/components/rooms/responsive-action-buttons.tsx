"use client";

import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  children: ReactNode;
  isOpened?: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ResponsiveActionButtons = ({ children, isOpened = false, setIsOpened }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpened(false);
      }
    };
    if (isOpened) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [isOpened, setIsOpened]);

  return (
    <>
      <div className="hidden flex-wrap gap-2 xl:flex">{children}</div>

      <div className="relative flex xl:hidden" ref={menuRef}>
        <Button variant="outline" size="icon" onClick={() => setIsOpened((o) => !o)}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>

        {isOpened && (
          <div
            className="animate-open absolute right-0 mt-2 flex origin-top-right scale-95 transform flex-col gap-2 rounded border bg-white p-3 opacity-0 shadow-lg transition duration-300 ease-out"
            style={{ animationFillMode: "forwards" }}
          >
            {children}
          </div>
        )}
      </div>

      <style>{`
        @keyframes open {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-open {
          animation: open 200ms ease-out;
        }
      `}</style>
    </>
  );
};
