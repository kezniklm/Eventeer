import { NavigationLink } from "./navigation-link";

type NavigationProps = React.PropsWithChildren;

export const Navigation = ({ children }: NavigationProps) => (
  <nav className="navbar sticky top-0 z-50 bg-white">
    <div className="mx-auto px-2 py-2 sm:max-w-4/5 sm:px-4">
      <div className="relative flex h-16 items-center justify-between">
        <NavigationLink href="/" className="text-xl font-medium">
          Eventeer
        </NavigationLink>
        <div className="ml-8 flex gap-x-2 sm:gap-x-4">{children}</div>
      </div>
    </div>
  </nav>
);
