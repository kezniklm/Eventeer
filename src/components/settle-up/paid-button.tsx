"use client";

import { Check } from "lucide-react";

import { type UserIdNamePair } from "@/db/zod/user";
import { useUserPaidMoneyMutation } from "@/hooks/mutations/settle-up";

import { Button } from "../ui/button";

type Props = {
  user: UserIdNamePair;
  hasPaid: boolean;
  amountPerUser: number;
  settleUpId: number;
};

export const PaidButton = ({ user, hasPaid, amountPerUser, settleUpId }: Props) => {
  const mutation = useUserPaidMoneyMutation();

  const handleClick = async () => {
    await mutation.mutateAsync({ settleUpId, userId: user.id });
  };

  return (
    <Button
      key={user.id}
      variant="outline"
      size="sm"
      onClick={handleClick}
      className="transition-all duration-1000 ease-in-out"
      disabled={mutation.isPending}
    >
      {user.name} - {amountPerUser.toFixed(2)} czk
      <span
        className={`flex transition-all duration-1000 ease-in-out ${hasPaid ? "ml-1 max-w-[24px] opacity-100" : "ml-0 max-w-0 opacity-0"} overflow-hidden`}
      >
        <Check className="ml-1 h-8 w-8 text-green-500" />
      </span>
    </Button>
  );
};
