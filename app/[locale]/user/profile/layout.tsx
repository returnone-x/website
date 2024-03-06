import { Space, Container } from "@mantine/core";
import React from "react";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container size="md">
      {children}
    </Container>
  );
}
