import { unstable_cache } from "next/cache";

import { type UserIdNamePair } from "@/db/zod/user";
import { getUserPaidMoney } from "@/repository/settleup";

import { PaidButton } from "./paid-button";

type Props = {
  settleUpId: number;
  users: UserIdNamePair[];
  money: number;
};

const getCachedPaidUsers = unstable_cache(
  async (settleUpId: number) => getUserPaidMoney(settleUpId),
  ["user-paid-money"]
);

export const PaidButtonsPanel = async ({ settleUpId, users, money }: Props) => {
  const amountPerUser = money / users.length;
  const usersPaidMoney = (await getCachedPaidUsers(settleUpId)).map((paid) => paid.fk_user);

  const hasUserPaid = (userId: string) => usersPaidMoney.includes(userId);
  return (
    <div className="flex flex-wrap gap-2">
      {users.map((user) => (
        <PaidButton
          key={user.id}
          amountPerUser={amountPerUser}
          hasPaid={hasUserPaid(user.id)}
          settleUpId={settleUpId}
          user={user}
        />
      ))}
    </div>
  );
};
