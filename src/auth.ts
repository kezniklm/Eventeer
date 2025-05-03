import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { type Provider } from "next-auth/providers";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";

import { db } from "./db";
import { accounts, authenticators, sessions, users, verificationTokens } from "./db/schema/auth";

const providers: Provider[] = [Google, Discord];

const isUnprotectedPath = (path: string) => {
  const paths = ["/", "/login"];

  return paths.includes(path);
};

export type ProviderMap = {
  id: string;
  name: string;
};

export const providerMap: ProviderMap[] = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { signIn, signOut, handlers, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/login"
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators
  }),
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;

      const isNotProtected = isUnprotectedPath(nextUrl.pathname);

      if (isNotProtected) {
        return true;
      }

      if (!isLoggedIn) {
        const redirect = new URL("/login", nextUrl.origin);
        redirect.searchParams.append("callbackUrl", nextUrl.href);

        return Response.redirect(redirect);
      }

      return true;
    }
  }
});
