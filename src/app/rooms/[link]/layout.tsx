import { getCurrentUser } from "@/auth";
import { getRoomByLink } from "@/repository/room";
import { getRoomUsersNames } from "@/repository/rooms";

import { Providers } from "./(providers)";

const Layout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ link: string }> }) => {
  const { link } = await params;
  const room = await getRoomByLink(link);
  const user = await getCurrentUser();

  if (!room) {
    return children;
  }
  const users = await getRoomUsersNames(room?.id);

  return (
    <Providers roomInfo={{ room, users: users.filter((roomUser) => roomUser.id !== user.id) }}>{children}</Providers>
  );
};

export default Layout;
