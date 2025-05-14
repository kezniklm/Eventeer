"use client";

import { type UserIdNamePair } from "@/db/zod/user";
import { useUserPaidMoneyMutation } from "@/hooks/mutations/settle-up";

import { AnimatedCheckButton } from "../controls/animated-check-button";

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
    <AnimatedCheckButton onClick={handleClick} showCheck={hasPaid}>
      {user.name} - {amountPerUser.toFixed(2)} czk
    </AnimatedCheckButton>
  );
};
