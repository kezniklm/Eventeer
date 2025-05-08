import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TaskCardProps = {
  name: string;
  description?: string;
};

export const TaskCard = ({ name, description }: TaskCardProps) => (
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
