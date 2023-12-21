"use client";

import { HeaderLanguage } from "./Header";
import { ActionIcon, Avatar, Menu } from "@mantine/core";
import { HiOutlineLogout, HiOutlineUserCircle } from "react-icons/hi";
import { getLogout } from "@/api/Auth/logout";
import { useEffect } from "react";
import { refreshToken } from "@/api/Auth/refreshToken";
import Cookies from "js-cookie";
// whole components
export function UserAvatarDropdown({
  t,
  avatar,
}: {
  t: HeaderLanguage;
  avatar: string;
}) {
  useEffect(() => {
    const refreshTokenFunction = async () => {
      const res = await refreshToken();
      if (res.status != 200) {
        Cookies.remove("refreshToken")
        Cookies.remove("accessToken")
        window.location.reload();
      }
    };
    setInterval(() => {refreshTokenFunction()}, 10 * 60 * 1000);
  }, []);
  const logout = async () => {
    const res = await getLogout();
    if (res.status == 200) {
      window.location.reload();
    }
  };
  return (
    <Menu radius="lg" width={200}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <Avatar variant="filled" radius="md" src={avatar} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<HiOutlineUserCircle size={20} />}>
          {t.profile}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<HiOutlineLogout size={20} />}
          onClick={() => logout()}
        >
          {t.logout}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
