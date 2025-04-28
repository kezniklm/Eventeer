import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your profile on Eventeer. Edit your personal details, track your events, and more."
};

const ProfilePage = () => (
  <div>
    <button className="btn btn-primary">Button</button>
  </div>
);

export default ProfilePage;
