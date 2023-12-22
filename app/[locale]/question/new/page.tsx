import { NewQuestion } from "@/components/question/new/new";
import { Container } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function NewQuestionPage() {
  const t = useTranslations("NewQuestion");
  const signipLoginTranslate = {
    title: t("title"),
    pleaseEnterATitle: t("pleaseEnterATitle"),
    pickTagsTips: t("pickTagsTips"),
    tags: t("tags"),
    pleaseEnterTags: t("pleaseEnterTags"),
    howToAskAGoodQuestion: t("howToAskAGoodQuestion"),
    titleMustBeLessThan250Letters: t("titleMustBeLessThan250Letters"),
    pleasEnterTags: t("pleasEnterTags"),
    toMuchContent: t("toMuchContent"),
    pleaseEnterDescriptions: t("pleaseEnterDescriptions"),
    content: t("content"),
    reviewYourQuestion: t("reviewYourQuestion"),
    askANewQuestion: t("askANewQuestion"),
  };
  return (
    <Container size="xl">
      <NewQuestion t={signipLoginTranslate}/>
    </Container>
  );
}
