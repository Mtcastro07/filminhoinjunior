import { QueryProvider } from "@/providers/query-provider";
import { AuthSessionProvider } from "@/providers/session-provider";

import "./globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={"antialiased"}>
      <body className="flex min-h-dvh flex-col">
        <AuthSessionProvider>
          <QueryProvider>{children}</QueryProvider>
      </AuthSessionProvider>
      </body>
    </html>
  );
}
