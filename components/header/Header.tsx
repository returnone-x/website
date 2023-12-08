import {
  Container,
  Group,
  Text,
  Button,
  TextInput,
  Space,
} from "@mantine/core";
import classes from "./Header.module.css";
import { HiOutlineSearch, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

export async function HeaderComponent({ t }: { t: any }) {
  return (
    <header className={classes.header}>
      <Container size="1440px" className={classes.container}>
        <Group justify="space-between" gap="xl">
          <Group justify="space-between" gap="sm">
            <Text fw={700} size="30px" className={classes.centerHorizontal}>
              returnone
            </Text>
            <Space w="xl" className={classes.flexone}/>
            <Text fw={700} size="md" className={classes.centerHorizontal}>
              {t("blog")}
            </Text>{" "}
            <Text fw={700} size="md" className={classes.centerHorizontal}>
              {t("about_us")}
            </Text>
          </Group>

          <TextInput
            placeholder={t("search")}
            className={classes.textInput}
            radius="lg"
            rightSection={<HiOutlineSearch />}
          />
          <Group justify="space-between" gap="sm">
            <Button
              leftSection={<HiOutlineQuestionMarkCircle size={20} />}
              radius="md"
              variant="gradient"
              gradient={{ from: "#FFC37D", to: "#FF6B01", deg: 154 }}
            >
              Ask
            </Button>
            <Space w="xl" className={classes.flexone}/>
            <Button variant="outline" radius="md">
              {t("login")}
            </Button>
            <Button variant="filled" radius="md" color="">
              {t("signup")}
            </Button>
            <Space w="xl" className={classes.flexone}/>
            <FaGithub size={35}></FaGithub>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
