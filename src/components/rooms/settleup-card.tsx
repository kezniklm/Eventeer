import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SettleUpCardProps = {
  name: string;
  description?: string;
  date?: string;
  author?: string;
  transactions?: { user: string; amount: string }[];
  total?: string;
};

export const SettleUpCard = ({ name, description, date, author, transactions = [], total }: SettleUpCardProps) => (
  <Card className="bg-secondary animate-fade-in-slow space-y-4 p-4">
    <CardHeader className="flex items-start justify-between">
      <div>
        <CardTitle className="text-2xl">{name}</CardTitle>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
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
        <Button className="mt-2 flex items-center gap-1" variant="outline" size="sm">
          {total} czk
        </Button>
      )}
    </CardContent>
  </Card>
);
