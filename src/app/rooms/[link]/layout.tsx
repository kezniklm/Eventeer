import { getRoomByLink } from "@/repository/room";
import { getRoomUsersNames } from "@/repository/rooms";

import { Providers } from "./(providers)";

const Layout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ link: string }> }) => {
  const { link } = await params;
  const room = await getRoomByLink(link);

  if (!room) {
    return children;
  }
  const users = await getRoomUsersNames(room?.id);

  return (
    <Providers roomInfo={{ room, users }}>
      <div className="mx-auto space-y-8 px-2 sm:px-6 md:space-y-10 md:px-8 lg:space-y-12">{children}</div>
    </Providers>
  );
};

export default Layout;
