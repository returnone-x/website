"use client";

import { HeaderLanguage } from "./Header";
import { ActionIcon, Avatar, Menu } from "@mantine/core";
import { MdLogout } from "react-icons/md";
import { RiSettings5Line } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { getLogout } from "@/api/Auth/logout";
import { useEffect } from "react";
import { refreshToken } from "@/api/Auth/refreshToken";
// whole components
export function UserAvatarDropdown({
  t,
  avatar,
}: {
  t: HeaderLanguage;
  avatar: string;
}) {
  const logout = async () => {
    await getLogout();
    window.location.reload();
  };
  return (
    <Menu radius="lg" width={200}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <Avatar variant="filled" radius="md" src={avatar} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<AiOutlineUser size={20} />}>
          {t.profile}
        </Menu.Item>
        <Menu.Item leftSection={<RiSettings5Line size={20} />}>
          {t.setting}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<MdLogout size={20} />}
          onClick={() => logout()}
        >
          {t.logout}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
