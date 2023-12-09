"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { HiMoon, HiSun } from "react-icons/hi";
import classes from "./Header.module.css";

export function SetTheme() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const icon =
    colorScheme === "dark" ? <HiSun size={25} /> : <HiMoon size={25} />;
  return (
    <ActionIcon
      variant="subtle"
      aria-label="github"
      visibleFrom="sm"
      className={classes.icon}
      onClick={toggleColorScheme}
    >
      {icon}
    </ActionIcon>
  );
}
