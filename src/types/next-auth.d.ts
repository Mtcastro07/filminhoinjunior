import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string | null;
    initials: string;
    accessToken: string;
  }

  interface Session {
    accessToken: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      avatarUrl?: string | null;
      initials: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string | null;
    initials: string;
    accessToken: string;
  }
}
