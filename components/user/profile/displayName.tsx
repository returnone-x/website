"use client";

import { checkUsername } from "@/api/Auth/checkUsername";
import { IsValidUsername } from "@/utils/valid";
import {
  Avatar,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { UserProfileSettingLanguage } from "./profileGetData";
import { notifications } from "@mantine/notifications";
import { HiCheckCircle, HiEmojiSad } from "react-icons/hi";
import UserSetting from "@/app/[locale]/user/setting/page";
import { UpdateUserDisplayName } from "@/api/user/profile/updateUserDisplayName";
import { UpdateUsername } from "@/api/user/profile/updateUsername";
import { UpdateUserAllName } from "@/api/user/profile/updateUserAllName";

export function UserDisplayName({
  userSettingDetil,
  t,
}: {
  userSettingDetil: any;
  t: UserProfileSettingLanguage;
}) {
  const [loading, setLoading] = useState(false);
  const [oldUsername, setOldUsername] = useState(
    userSettingDetil.data.username
  );
  const [oldDisplayName, setOldDisplayName] = useState(
    userSettingDetil.data.display_name
  );
  const [disableButton, setDisableButton] = useState(true);

  // cuz username need update frequently to let user know does this username is available
  const [usernameError, setUsernameError] = useState("");
  // set signup form(mantine components)
  const userSettingform = useForm({
    initialValues: {
      username: userSettingDetil.data.username,
      displayName: userSettingDetil.data.display_name,
    },

    validate: {
      // username cuz need update frequently so use this way (i know this is so stupid)
      username: (value) => (usernameError === "" ? null : usernameError),
      displayName: (value) => (value.length > 30 ? t.invalidDisplayName : null),
    },
  });

  // set username and this will delay 300ms (need rate the api)
  const [username] = useDebouncedValue(userSettingform.values.username, 300);

  // if the username variable is change than check the username is been use or not
  const fetchCheckUsername = async () => {
    // username have no type then just set error to the UsernameError (Because I don't want the user to have an error without even typing anything)
    if (username === "") {
      setUsernameError(t.pleaseEnterAUsername);
      return;
    }
    // get api to check username is been use or not
    const res = await checkUsername(username);
    if (res.data.inuse && oldUsername !== userSettingform.values.username) {
      console.log(res.data.inuse);
      userSettingform.setErrors({ username: t.usernameHasBeenUse });
      setUsernameError(t.usernameHasBeenUse);
    } else if (IsValidUsername(username)) {
      userSettingform.setErrors({ username: null });
      setUsernameError("");
    } else {
      userSettingform.setErrors({ username: t.invalidUsername });
      setUsernameError(t.invalidUsername);
    }
  };

  const updateAllUsername = async () => {
    setLoading(true);

    let res = null;
    if (oldDisplayName !== userSettingform.values.displayName) {
      res = await UpdateUserDisplayName(userSettingform.values.displayName);
      setOldDisplayName(userSettingform.values.displayName);
    } else if (oldUsername !== userSettingform.values.username) {
      res = await UpdateUsername(userSettingform.values.username);
      setOldUsername(userSettingform.values.username);
    } else {
      res = await UpdateUserAllName(
        userSettingform.values.username,
        userSettingform.values.displayName
      );
    }
    if (res != null && res.status === 200) {
      notifications.show({
        color: "green",
        title: t.successfulUpdateUserAllNameTitle,
        message: "",
        icon: <HiCheckCircle size={30} />,
        autoClose: 5000,
      });
    } else {
      notifications.show({
        color: "red",
        title: t.errorUpdateUserAllNameTitle,
        message: t.errorUpdateUserAllName + "\n" + res.data.error,
        icon: <HiEmojiSad size={25} />,
        autoClose: 5000,
      });
    }
    setDisableButton(true);
    setLoading(false);
  };

  useEffect(() => {
    if (
      oldUsername !== userSettingform.values.username ||
      oldDisplayName !== userSettingform.values.displayName ||
      oldUsername !== userSettingform.values.username ||
      oldDisplayName !== userSettingform.values.displayName
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSettingform.values.displayName, userSettingform.values.username]);

  useEffect(() => {
    fetchCheckUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
  return (
    <>
      <form
        onSubmit={userSettingform.onSubmit(() => {
          updateAllUsername();
        })}
      >
        <Stack gap={10}>
          <TextInput
            label={
              <Text size="md" fw={700}>
                {t.displayName}
              </Text>
            }
            placeholder={t.displayName}
            disabled={loading}
            {...userSettingform.getInputProps("displayName")}
          />
          <TextInput
            label={
              <Text size="md" fw={700}>
                {t.username}
              </Text>
            }
            placeholder={t.username}
            disabled={loading}
            {...userSettingform.getInputProps("username")}
          />

          <div>
            <Button
              variant="filled"
              color="orange"
              radius="md"
              size="sm"
              type="submit"
              loading={loading}
              disabled={disableButton ? true : false}
            >
              {t.save}
            </Button>
          </div>
        </Stack>
      </form>
    </>
  );
}
