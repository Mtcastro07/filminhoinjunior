export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/User/:path*"],
};