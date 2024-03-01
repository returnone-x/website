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

export function Profile() {
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
      <Divider my="md" />
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack>
            <TextInput
              label={
                <Text size="md" fw={700}>
                  Display name
                </Text>
              }
              placeholder="Display name"
            />
            <TextInput
              label={
                <Text size="md" fw={700}>
                  Username
                </Text>
              }
              placeholder="Your id"
            />

            <Textarea
              label={
                <Text size="md" fw={700}>
                  Bio
                </Text>
              }
              placeholder="Tell us a little bit about yourself"
            />
            <TextInput
              label={
                <Text size="md" fw={700}>
                  Public Email
                </Text>
              }
              placeholder="Public email "
            />
            <Stack gap="xs">
              <Select
                label={
                  <Text size="md" fw={700}>
                    Pronouns
                  </Text>
                }
                placeholder="Pick value"
                data={[
                  "they/them",
                  "she/her",
                  "he/him",
                  "Croissant",
                  "Prefer not to say",
                  "Other (Custom)",
                ]}
              />
              <TextInput placeholder="Custom pronouns" />
            </Stack>
            <TextInput
              label={
                <Text size="md" fw={700}>
                  Your Website
                </Text>
              }
              placeholder="Website link"
            />

            <Text fw={700} size="lg">
              Related links
            </Text>
            <Stack gap="xs">
              <TextInput placeholder="Link" />
              <div>
                <Button variant="filled" color="orange" radius="md" size="sm">
                  Add
                </Button>
              </div>
            </Stack>
            <div>
              <Button variant="filled" color="orange" radius="md" size="sm">
                Save
              </Button>
            </div>
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
