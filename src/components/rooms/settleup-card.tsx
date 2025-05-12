import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SettleUpCardProps = {
  name: string;
  isPublic: boolean;
  description?: string;
  date?: string;
  author?: string;
  transactions?: { user: string; amount: string }[];
  total?: string;
  repeatableType?: string;
  repeatableValue?: number | null;
};

export const SettleUpCard = ({
  name,
  isPublic,
  description,
  date,
  author,
  transactions = [],
  total,
  repeatableType,
  repeatableValue
}: SettleUpCardProps) => (
  <Card className="bg-secondary animate-fade-in-slow space-y-4 p-4">
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
          {repeatableValue !== undefined && repeatableValue !== null && repeatableValue > 0 ? "Repeatable" : "One-time"}
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
            {t.user} - {t.amount} czk
          </Button>
        ))}
      </div>

      {total && (
        <Button className="mt-2 flex items-center gap-1 font-bold" variant="outline" size="sm">
          {total} czk
        </Button>
      )}
    </CardContent>
  </Card>
);
