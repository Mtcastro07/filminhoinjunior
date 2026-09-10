"use client";

import "./globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={"antialiased"}>
      <body>{children}</body>
    </html>
  );
}
