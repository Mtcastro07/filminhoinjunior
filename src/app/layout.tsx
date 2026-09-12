"use client";

import "./globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={"antialiased"}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
