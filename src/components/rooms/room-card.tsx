"use client";

import Link from "next/link";

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
import { type Result } from "@/result";

import { InviteUserForm } from "./user-invite";

type RoomCardProps = {
  id: number;
  title: string;
  linkName?: string;
  badges: string[];
  handleLeave?: () => void;
  handleAddUser?: (email: string) => Promise<Result>;
  handleAccept?: () => void;
  handleDecline?: () => void;
};

export const RoomCard = ({
  title,
  linkName,
  badges,
  handleLeave,
  handleAddUser,
  handleAccept,
  handleDecline
}: RoomCardProps) => (
  <Card className="bg-secondary animate-fade-in-slow transition duration-500 hover:-translate-y-2 hover:shadow-lg">
    <CardHeader>
      <CardTitle className="flex text-3xl">
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
          {!handleAccept && !handleDecline && linkName && (
            <Button asChild variant="default" size="sm">
              <Link href={`/rooms/${linkName}`}>Go to Room</Link>
            </Button>
          )}
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-wrap items-center gap-2">
      {badges.map((badge, index) => (
        <Badge key={index} className="bg-[#BDD1D2] px-3 py-2 text-sm">
          {badge}
        </Badge>
      ))}
      {handleAddUser && <InviteUserForm onInvite={handleAddUser} />}
    </CardContent>
  </Card>
);
