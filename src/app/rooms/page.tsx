import { type Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "View and manage your rooms on Eventeer. Track events, expenses, and collaborate with others in shared spaces."
};

const RoomsPage = () => (
  <div>
    <Button>Button</Button>
  </div>
);

export default RoomsPage;
