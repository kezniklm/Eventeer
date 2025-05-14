import { type User } from "next-auth";

import { getCurrentUser } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type PeriodEnum, type PriorityEnum } from "@/db/zod/activity";
import { type SettleUpForm } from "@/db/zod/settle-up";
import { type UserIdNamePair } from "@/db/zod/user";

import { SettleUpCardControls } from "../controls/settle-up/settle-up-card-controls";
import { PaidButtonsPanel } from "../settle-up/paid-buttons-panel";

type SettleUpCardProps = {
  settleUpId: number;
  name: string;
  isPublic: boolean;
  description?: string;
  date?: string;
  author?: User;
  money?: number;
  repeatableType?: PeriodEnum;
  repeatableValue?: boolean;
  users: UserIdNamePair[];
  priority: PriorityEnum;
};

export const SettleUpCard = async ({
  name,
  isPublic,
  description,
  date,
  author,
  money,
  repeatableType,
  repeatableValue,
  settleUpId,
  users,
  priority
}: SettleUpCardProps) => {
  const forUpdateData: SettleUpForm = {
    description: description!,
    name,
    money: money!,
    users,
    isPublic,
    priority,
    repeatableType: repeatableType ?? null,
    repeatableValue: repeatableValue ?? false
  };

  const { id } = await getCurrentUser();

  return (
    <Card className="bg-secondary animate-fade-in-slow group space-y-4">
      <CardHeader className="flex items-start justify-between">
        <div>
          <CardTitle className="text-2xl">{name}</CardTitle>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs ${isPublic ? "bg-green-100 text-green-800" : "bg-red-100 text-red-600"}`}
          >
            {isPublic ? "Public" : "Private"}
          </span>
          <span
            className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs ${
              repeatableValue !== undefined && repeatableValue !== null && repeatableValue
                ? "bg-purple-200 text-purple-800"
                : "bg-indigo-200 text-indigo-800"
            }`}
          >
            {repeatableValue !== undefined && repeatableValue !== null && repeatableValue ? "Repeatable" : "One-time"}
          </span>
          {repeatableValue !== undefined && repeatableValue !== null && repeatableValue && (
            <>
              <span
                className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs ${
                  repeatableType === "DAILY"
                    ? "bg-indigo-300 text-indigo-800"
                    : repeatableType === "WEEKLY"
                      ? "bg-indigo-200 text-indigo-800"
                      : repeatableType === "MONTHLY"
                        ? "bg-purple-300 text-purple-800"
                        : "bg-purple-200 text-purple-800"
                }`}
              >
                {repeatableValue
                  ? (repeatableType ?? "").charAt(0).toUpperCase() + (repeatableType ?? "").slice(1).toLowerCase()
                  : `${repeatableValue} ${(repeatableType ?? "").toLowerCase()}s`}
              </span>
              <span
                className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs ${
                  priority === "HIGH"
                    ? "bg-red-100 text-red-800"
                    : priority === "NORMAL"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-green-100 text-green-800"
                } `}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}
              </span>
            </>
          )}
        </div>
        <div className="text-foreground text-right text-xs">
          {date && <div>{date}</div>}
          {author && <div className="mt-1">By: {author.name}</div>}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <PaidButtonsPanel settleUpId={settleUpId} users={users} money={money ?? 0} />
        {money && (
          <Button className="mt-2 flex items-center gap-1 font-bold" variant="outline" size="sm">
            {money} czk
          </Button>
        )}
        <SettleUpCardControls forUpdateData={forUpdateData} settleUpId={settleUpId} userId={id} author={author} />
      </CardContent>
    </Card>
  );
};
