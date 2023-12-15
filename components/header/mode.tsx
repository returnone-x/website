"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { HiMoon, HiSun } from "react-icons/hi";
import classes from "./Header.module.css";

export function SetTheme({ visibleFrom }: { visibleFrom: string }) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const icon =
    colorScheme === "dark" ? <HiSun size={25} /> : <HiMoon size={25} />;
  if (visibleFrom === "") {
    return (
      <ActionIcon
        variant="subtle"
        aria-label="github"
        className={classes.icon}
        onClick={toggleColorScheme}
      >
        {icon}
      </ActionIcon>
    );
  } else {
    return (
      <ActionIcon
        variant="subtle"
        aria-label="github"
        className={classes.icon}
        onClick={toggleColorScheme}
        visibleFrom={visibleFrom}
      >
        {icon}
      </ActionIcon>
    );
  }
}
