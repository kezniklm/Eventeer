import Link from "next/link";

type NavigationLinkProps = {
  href: string;
  className: string;
};

export const NavigationLink = ({ href, children, className }: React.PropsWithChildren<NavigationLinkProps>) => (
  <Link href={href} className={className}>
    {children}
  </Link>
);
