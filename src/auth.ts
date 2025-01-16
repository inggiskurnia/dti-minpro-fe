import NextAuth, { User, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { API_URL } from "./constants/url";
import { LoginResponse, TokenClaims } from "./types/auth/TokenPair";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";

interface Token {
  accessToken: {
    claims: TokenClaims;
    value: string;
  };
  refreshToken: {
    claims: TokenClaims;
    value: string;
  };
  roles: string[];
  userId: number;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1,
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }) {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.auth.login}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          return null;
        }

        const { data } = (await response.json()) as LoginResponse;

        // Verify the JWT signature
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          console.error("JWT secret not set");
          return null;
        }

        try {
          jwt.verify(data.accessToken, secret);
        } catch (err) {
          console.error("JWT verification failed:", err);
          return null;
        }

        const decodedToken = jwtDecode<TokenClaims>(data.accessToken);

        // Extract claims from the decoded token
        const { sub, scope, userId } = decodedToken;

        const parsedResponse: User = {
          email: sub,
          token: {
            accessToken: {
              claims: decodedToken,
              value: data.accessToken,
            },
            refreshToken: {
              claims: jwtDecode<TokenClaims>(data.refreshToken),
              value: data.refreshToken,
            },
          },
          roles: scope.split(" "),
          userId: parseInt(userId),
        };

        return parsedResponse ?? null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      const customToken = token as unknown as Token;
      session.accessToken = customToken.accessToken.value;
      session.refreshToken = customToken.refreshToken.value;
      session.user = {
        ...session.user,
        roles: customToken.roles,
        id: customToken.accessToken.claims.userId,
      };
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        const customToken: Token = {
          accessToken: {
            claims: user.token.accessToken.claims,
            value: user.token.accessToken.value,
          },
          refreshToken: {
            claims: user.token.refreshToken.claims,
            value: user.token.refreshToken.value,
          },
          roles: user.roles,
          userId: user.userId,
        };
        token = customToken as unknown as JWT;
      }

      const customToken = token as unknown as Token;

      // Handle access token expiration
      if (
        customToken.accessToken.claims.exp &&
        Date.now() >= customToken.accessToken.claims.exp * 1000
      ) {
        const newToken = await refreshToken(customToken.refreshToken.value);
        if (!newToken) {
          return null;
        }
        customToken.accessToken = newToken;
      }
      return customToken as unknown as JWT;
    },
    async signIn({ user }: { user: User }) {
      console.log("IN SIGNIN CALLBACK: ", user);
      return true;
    },
  },
});

const refreshToken = async (refreshToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.auth.refresh}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    body: JSON.stringify({ token: refreshToken }),
  });
  if (!response.ok) {
    console.error("Failed to refresh access token");
    return null;
  }
  const { data } = (await response.json()) as LoginResponse;

  // Verify the JWT signature
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT secret not set");
    return null;
  }

  try {
    jwt.verify(data.accessToken, secret);
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }

  const decodedToken = jwtDecode<TokenClaims>(data.accessToken);

  return {
    claims: decodedToken,
    value: data.accessToken,
  };
};
