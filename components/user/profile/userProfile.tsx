"use client";

import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { UserProfileSettingLanguage } from "./profileGetData";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { values } from "lodash";
import { notifications } from "@mantine/notifications";
import { UpdateUserAllProfile } from "@/api/user/profile/updateUserProfile";
import { HiCheckCircle, HiEmojiSad } from "react-icons/hi";

export function UserProfile({
  userSettingDetil,
  t,
}: {
  userSettingDetil: any;
  t: UserProfileSettingLanguage;
}) {
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const [oldBio, setOldBio] = useState(userSettingDetil.data.bio);
  const [oldPublicEmail, setOldPublicEmail] = useState(
    userSettingDetil.data.public_email
  );
  const [oldPronouns, setOldPronouns] = useState(
    userSettingDetil.data.pronouns
  );
  const [oldRelatedLinks, setOldRelatedLinks] = useState(
    userSettingDetil.data.related_links
  );

  const [relatedLinksArray, setRelatedLinksArray] = useState<string[]>([]);
  const userProfileForm = useForm({
    initialValues: {
      bio: userSettingDetil.data.bio,
      publicEmail: userSettingDetil.data.public_email,
      pronouns: userSettingDetil.data.pronouns,
      relatedLinks1: userSettingDetil.data?.related_links[0]
        ? userSettingDetil.data.related_links[0]
        : "",
      relatedLinks2: userSettingDetil.data?.related_links[1]
        ? userSettingDetil.data.related_links[1]
        : "",
      relatedLinks3: userSettingDetil.data?.related_links[2]
        ? userSettingDetil.data.related_links[2]
        : "",
      relatedLinks4: userSettingDetil.data?.related_links[3]
        ? userSettingDetil.data.related_links[3]
        : "",
      relatedLinks5: userSettingDetil.data?.related_links[4]
        ? userSettingDetil.data.related_links[4]
        : "",
    },

    validate: {
      bio: (value) => (value.length > 150 ? t.invalidBio : null),
      publicEmail: (value) => (value.length > 150 ? t.invalidPublicEmail : null),
      pronouns: (value) => (value.length > 20 ? t.invalidPronouns : null),
      relatedLinks1: (value) => (value.length > 150 ? t.invalidRelatedLinks : null),
      relatedLinks2: (value) => (value.length > 150 ? t.invalidRelatedLinks : null),
      relatedLinks3: (value) => (value.length > 150 ? t.invalidRelatedLinks : null),
      relatedLinks4: (value) => (value.length > 150 ? t.invalidRelatedLinks : null),
      relatedLinks5: (value) => (value.length > 150 ? t.invalidRelatedLinks : null),
    },
  });

  const updateUserProfileFunction = async () => {
    setLoading(true);

    let res = await UpdateUserAllProfile(
      userProfileForm.values.bio,
      userProfileForm.values.publicEmail,
      userProfileForm.values.pronouns,
      relatedLinksArray
    );
    setOldBio(userProfileForm.values.bio)
    setOldPublicEmail(userProfileForm.values.publicEmail)
    setOldPronouns(userProfileForm.values.pronouns)
    setOldRelatedLinks(relatedLinksArray)
    if (res != null && res.status === 200) {
      notifications.show({
        color: "green",
        title: t.successfulUpdateUserAllProfileTitle,
        message: "",
        icon: <HiCheckCircle size={30} />,
        autoClose: 5000,
      });
    } else {
      notifications.show({
        color: "red",
        title: t.errorUpdateUserAllProfileTitle,
        message: t.errorUpdateUserAllProfile + "\n" + res.data.error,
        icon: <HiEmojiSad size={25} />,
        autoClose: 5000,
      });
    }
    setDisableButton(true);
    setLoading(false);
  };

  useEffect(() => {
    const tempArray = [];
    for (let i = 1; i <= 5; i++) {
      const relatedLink =
        userProfileForm.values[
          `relatedLinks${i}` as keyof typeof userProfileForm.values
        ];
      if (relatedLink) {
        tempArray.push(relatedLink);
      }
    }
    setRelatedLinksArray(tempArray);
    if (
      oldBio !== userProfileForm.values.bio ||
      oldPublicEmail !== userProfileForm.values.publicEmail ||
      oldPronouns !== userProfileForm.values.pronouns ||
      JSON.stringify(oldRelatedLinks) !== JSON.stringify(tempArray)
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfileForm.values]);

  return (
    <>
      <form
        onSubmit={userProfileForm.onSubmit(() => {
          updateUserProfileFunction()
        })}
      >
        <Stack gap={10}>
          <Textarea
            label={
              <Text size="md" fw={700}>
                {t.bio}
              </Text>
            }
            placeholder={t.tellUsALittleBitAboutYourself}
            {...userProfileForm.getInputProps("bio")}
          />
          <TextInput
            label={
              <Text size="md" fw={700}>
                {t.publicEmail}
              </Text>
            }
            placeholder="Public email"
            {...userProfileForm.getInputProps("publicEmail")}
          />
          <Stack gap="xs">
            <Select
              label={
                <Text size="md" fw={700}>
                  {t.pronouns}
                </Text>
              }
              placeholder="Pick value"
              data={[
                "they/them",
                "she/her",
                "he/him",
                "Croissant",
                "Prefer not to say",
                "Other",
              ]}
              {...userProfileForm.getInputProps("pronouns")}
            />
          </Stack>

          <Text fw={700} size="lg">
            {t.relatedLinks}
          </Text>
          <TextInput
            placeholder={t.link}
            {...userProfileForm.getInputProps("relatedLinks1")}
          />
          <TextInput
            placeholder={t.link}
            {...userProfileForm.getInputProps("relatedLinks2")}
          />
          <TextInput
            placeholder={t.link}
            {...userProfileForm.getInputProps("relatedLinks3")}
          />
          <TextInput
            placeholder={t.link}
            {...userProfileForm.getInputProps("relatedLinks4")}
          />
          <TextInput
            placeholder={t.link}
            {...userProfileForm.getInputProps("relatedLinks5")}
          />
          <Space h="md" />
          <div>
            <Button
              type="submit"
              variant="filled"
              color="orange"
              radius="md"
              size="sm"
              disabled={disableButton}
              loading={loading}
            >
              {t.save}
            </Button>
          </div>
        </Stack>
      </form>
    </>
  );
}
