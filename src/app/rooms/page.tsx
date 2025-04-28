import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "View and manage your rooms on Eventeer. Track events, expenses, and collaborate with others in shared spaces."
};

const RoomsPage = () => (
  <div>
    <button className="btn btn-primary">Button</button>
  </div>
);

export default RoomsPage;
