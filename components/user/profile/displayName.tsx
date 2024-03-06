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
import { UserProfile } from "./userProfile";

export function DisplayName() {
  return (
    <>
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
    </>
  );
}
