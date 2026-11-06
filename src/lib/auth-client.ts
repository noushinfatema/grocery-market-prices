import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://grocery-market-prices.vercel.app"),
});

export const { signIn, signUp, useSession, signOut, updateUser } = authClient;