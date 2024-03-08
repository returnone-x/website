"use client";

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
import { UserDisplayName } from "./displayName";
import { UserProfile } from "./userProfile";
import { UserProfileSettingLanguage } from "./profileGetData";

export function ProfileLayout({
  userSettingDetil,
  t,
}: {
  userSettingDetil: any;
  t: UserProfileSettingLanguage;
}) {
  return (
    <>
      <Group>
        <Avatar
          src="https://avatars.githubusercontent.com/u/107802416?v=4"
          alt="it's me"
          size="lg"
        />
        <Stack gap={0}>
          <Text size="xl" fw={700}>
            Night Cat
          </Text>
          <Text size="md">MHNightCat</Text>
        </Stack>
      </Group>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack>
            <Divider my="xs" label="User display name" labelPosition="center" />
            <UserDisplayName
              t={t}
              userSettingDetil={userSettingDetil}
            ></UserDisplayName>
            <Divider my="xs" label="User profile" labelPosition="center" />
            <UserProfile
              userSettingDetil={userSettingDetil}
              t={t}
            ></UserProfile>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 0, sm: 6 }}>
          <Center>
            <Avatar
              src="https://avatars.githubusercontent.com/u/107802416?v=4"
              alt="it's me"
              size="200px"
            />
          </Center>
        </Grid.Col>
      </Grid>
    </>
  );
}
