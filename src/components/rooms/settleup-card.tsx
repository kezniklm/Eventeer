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
};

export const SettleUpCard = ({
  name,
  isPublic,
  description,
  date,
  author,
  transactions = [],
  total
}: SettleUpCardProps) => (
  <Card className="bg-secondary animate-fade-in-slow space-y-4 p-4">
    <CardHeader className="flex items-start justify-between">
      <div>
        <CardTitle className="text-2xl">{name}</CardTitle>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs ${isPublic ? "bg-green-100 text-green-800" : "bg-gray-200 text-red-600"}`}
        >
          {isPublic ? "Public" : "Private"}
        </span>
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
