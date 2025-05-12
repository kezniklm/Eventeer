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
  repeatableType?: string;
  repeatableValue?: number | null;
};

export const EventCard = ({
  name,
  description,
  isPublic,
  date,
  author,
  users = [],
  place,
  repeatableType,
  repeatableValue
}: EventCardProps) => (
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
