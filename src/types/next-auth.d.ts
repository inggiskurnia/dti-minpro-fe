import "next-auth";
import { DefaultSession } from "next-auth";
import { TokenClaims } from "./auth/TokenPair";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    error?: string;
    user: {
      id: string;
      email: string;
      roles: string[];
    } & DefaultSession["user"];
  }

  interface UserTokenDetails {
    accessToken: {
      claims: TokenClaims;
      value: string;
    };
    refreshToken: {
      claims: TokenClaims;
      value: string;
    };
  }

  interface User {
    roles: string[];
    token: UserTokenDetails;
    userId: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends JWT {
    roles: string[];
    accessToken: {
      claims: TokenClaims;
      value: string;
    };
    refreshToken: {
      claims: TokenClaims;
      value: string;
    };
    error?: string;
  }
}
