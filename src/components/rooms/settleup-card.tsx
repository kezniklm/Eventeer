import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SettleUpCardProps = {
  name: string;
  description?: string;
};

export const SettleUpCard = ({ name, description }: SettleUpCardProps) => (
  <Card className="bg-secondary animate-fade-in-slow">
    <CardHeader>
      <CardTitle>{name}</CardTitle>
    </CardHeader>
    {description && (
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    )}
  </Card>
);
