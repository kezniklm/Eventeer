import { Plus } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RoomCardProps = {
  id: number;
  title: string;
  badges: string[];
  handleLeave?: () => void;
  handleAddUser?: () => void;
  handleAccept?: () => void;
  handleDecline?: () => void;
};

export const RoomCard = ({ title, badges, handleLeave, handleAddUser, handleAccept, handleDecline }: RoomCardProps) => (
  <Card className="bg-secondary transition duration-500 hover:shadow-lg hover:-translate-y-2 animate-fade-in-slow">
    <CardHeader>
      <CardTitle className="text-3xl flex">
        <span>{title}</span>
        <div className="ml-auto flex gap-2">
          {handleLeave && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Leave
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">Do you want to leave?</AlertDialogTitle>
                  <AlertDialogDescription />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button variant="destructive" onClick={handleLeave}>
                      Leave
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {handleAccept && (
            <Button variant="default" size="sm" onClick={handleAccept}>
              Accept
            </Button>
          )}
          {handleDecline && (
            <Button variant="destructive" size="sm" onClick={handleDecline}>
              Decline
            </Button>
          )}
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-wrap flex gap-2">
      {badges.map((badge, index) => (
        <Badge key={index} className="text-sm bg-[#BDD1D2] px-3 py-2">
          {badge}
        </Badge>
      ))}
      {handleAddUser && (
        <Button className="bg-[#BDD1D2]">
          <Plus /> Add user
        </Button>
      )}
    </CardContent>
  </Card>
);
