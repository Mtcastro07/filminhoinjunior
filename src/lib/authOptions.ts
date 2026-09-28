import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface LoginResponseUser {
  id: number;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
  initials: string;
}

interface LoginResponse {
  data: {
    token: string;
    user: LoginResponseUser;
  };
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/Login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const response = await axios.post<LoginResponse>(
          "https://tarefaapi.onrender.com/api/v1/auth/login",
          {
            email: credentials.email,
            password: credentials.password,
          },
        );

        const { token, user } = response.data.data;

        return {
          id: String(user.id),
          fullName: user.fullName,
          email: user.email,
          avatarUrl: user.avatarUrl ?? null,
          initials: user.initials,
          accessToken: token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.fullName = user.fullName;
        token.avatarUrl = user.avatarUrl;
        token.initials = user.initials;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id,
        fullName: token.fullName,
        email: token.email,
        avatarUrl: token.avatarUrl,
        initials: token.initials,
      };
      return session;
    },
  },
};
