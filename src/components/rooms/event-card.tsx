import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type EventCardProps = {
  name: string;
  description?: string;
};

export const EventCard = ({ name, description }: EventCardProps) => (
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
