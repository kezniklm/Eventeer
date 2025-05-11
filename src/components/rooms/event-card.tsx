import { MapPin } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type EventCardProps = {
  name: string;
  description?: string;
  isPublic: boolean;
  date?: string;
  author?: string;
  users?: string[];
  place?: string;
};

export const EventCard = ({ name, description, isPublic, date, author, users = [], place }: EventCardProps) => (
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
        {users.map((u, i) => (
          <Button key={i} variant="outline" size="sm">
            {u}
          </Button>
        ))}
      </div>

      {place && (
        <Button className="mt-2 flex items-center gap-1" variant="outline" size="sm">
          <MapPin className="h-4 w-4" />
          {place}
        </Button>
      )}
    </CardContent>
  </Card>
);
