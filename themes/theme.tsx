import { CSSVariablesResolver, createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "primryColor",
  colors: {
    primryColor: [
      "#FF6B01",
      "#FF6B01",
      "#FF6B01",
      "#FF6B01",
      "#FF6B01",
      "#FF6B01",
      "#FF6B01",
      "#FF6B01",
      "#FF6B01",
      "#FF6B01",
    ],
    white: [
      "#ffffff",
      "#e6e6e6",
      "#cccccc",
      "#b3b3b3",
      "#999999",
      "#808080",
      "#666666",
      "#4c4c4c",
      "#333333",
      "#191919",
      "#000000",
    ],
  },
  other: {
    deepOrangeLight: "#E17900",
    deepOrangeDark: "#FC8C0C",
    deepBackground: "#212737",
    lightBackground: "#FFFFFF",
    heroHeight: rem(400),
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-hero-height": theme.other.heroHeight,
  },
  light: {
    "--mantine-color-body": theme.other.lightBackground,
    "--mantine-color-deep-orange": theme.other.deepOrangeLight,
  },
  dark: {
    "--mantine-color-body": theme.other.deepBackground,
    "--mantine-color-deep-orange": theme.other.deepOrangeDark,
  },
});
