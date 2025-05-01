import { type Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Room Details",
  description:
    "View detailed information about your room on Eventeer. Track events, expenses, and manage shared spaces."
};

const RoomDetailPage = () => (
  <div>
    <Button>Button</Button>
  </div>
);

export default RoomDetailPage;
