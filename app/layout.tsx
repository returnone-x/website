"use client";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import {
  MantineProvider,
  ColorSchemeScript,
  CSSVariablesResolver,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "./globals.css";
import { theme, resolver } from "@/themes/theme";
import { ModalsProvider } from "@mantine/modals";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider
          theme={theme}
          cssVariablesResolver={resolver}
          defaultColorScheme="dark"
        >
          <ModalsProvider>
            {children}
            <Notifications position="bottom-center" />
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
