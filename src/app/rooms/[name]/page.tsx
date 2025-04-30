import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Room Details",
  description:
    "View detailed information about your room on Eventeer. Track events, expenses, and manage shared spaces."
};

const RoomDetailPage = () => (
  <div>
    <button className="btn btn-primary">Button</button>
  </div>
);

export default RoomDetailPage;
