import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SettleUpUpdateProvider } from "@/context/settle-up-update-context";
import { type SettleUpForm } from "@/db/zod/settle-up";
import { type UserIdNamePair } from "@/db/zod/user";
import { type PriorityEnum } from "@/db/zod/activity";

import { UpdateButton } from "../controls/update-button";
import PopupForm from "../pop-up-form";

type SettleUpCardProps = {
  settleUpId: number;
  name: string;
  isPublic: boolean;
  description?: string;
  date?: string;
  author?: string;
  transactions?: { user: UserIdNamePair; amount: string }[];
  money?: number;
  repeatableType?: string;
  repeatableValue?: number;
  users: UserIdNamePair[];
  priority: PriorityEnum;
};

export const SettleUpCard = ({
  name,
  isPublic,
  description,
  date,
  author,
  transactions = [],
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
    isPublic, // TODO,
    priority
  };

  return (
    <Card className="bg-secondary animate-fade-in-slow group space-y-4 p-4">
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
              repeatableValue !== undefined && repeatableValue !== null && repeatableValue > 0
                ? "bg-purple-200 text-purple-800"
                : "bg-indigo-200 text-indigo-800"
            }`}
          >
            {repeatableValue !== undefined && repeatableValue !== null && repeatableValue > 0
              ? "Repeatable"
              : "One-time"}
          </span>
          {repeatableValue !== undefined && repeatableValue !== null && repeatableValue > 0 && (
            <span
              className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs ${
                repeatableType === "day"
                  ? "bg-indigo-300 text-indigo-800"
                  : repeatableType === "week"
                    ? "bg-indigo-200 text-indigo-800"
                    : repeatableType === "month"
                      ? "bg-purple-300 text-purple-800"
                      : "bg-purple-200 text-purple-800"
              }`}
            >
              {repeatableValue === 1
                ? (repeatableType ?? "").charAt(0).toUpperCase() + (repeatableType ?? "").slice(1).toLowerCase()
                : `${repeatableValue} ${(repeatableType ?? "").toLowerCase()}s`}
            </span>
          )}
        </div>
        <div className="text-muted-foreground text-right text-xs">
          {date && <div>{date}</div>}
          {author && <div className="mt-1">By: {author}</div>}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {transactions.map((t, i) => (
            <Button key={i} variant="outline" size="sm">
              {t.user.name} - {t.amount} czk
            </Button>
          ))}
        </div>
        {money && (
          <Button className="mt-2 flex items-center gap-1 font-bold" variant="outline" size="sm">
            {money} czk
          </Button>
        )}
        <SettleUpUpdateProvider data={forUpdateData} settleUpId={settleUpId}>
          <PopupForm type="settleup">
            <UpdateButton />
          </PopupForm>
        </SettleUpUpdateProvider>
      </CardContent>
    </Card>
  );
};
