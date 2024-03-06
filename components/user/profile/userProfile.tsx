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

export function UserProfile() {
  return (
    <>
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

      <div>
        <Button variant="filled" color="orange" radius="md" size="sm">
          Save
        </Button>
      </div>
    </>
  );
}
