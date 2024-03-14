import { Profile } from "@/components/user/profile/profileGetData";
import { useTranslations } from "next-intl";

export default function UserProfileSetting() {
  const t = useTranslations("UserProfileSetting");
  const userProfileSettingTranslate = {
    invalidUsername: t("invalidUsername"),
    usernameHasBeenUse: t("usernameHasBeenUse"),
    pleaseEnterAUsername: t("pleaseEnterAUsername"),
    errorUpdateUserAllNameTitle: t("errorUpdateUserAllNameTitle"),
    errorUpdateUserAllName: t("errorUpdateUserAllName"),
    successfulUpdateUserAllNameTitle: t("successfulUpdateUserAllNameTitle"),
    invalidDisplayName: t("invalidDisplayName"),
    invalidBio: t("invalidBio"),
    invalidPublicEmail: t("invalidPublicEmail"),
    invalidPronouns: t("invalidPronouns"),
    invalidRelatedLinks: t("invalidRelatedLinks"),
    errorUpdateUserAllProfile: t("errorUpdateUserAllProfile"),
    errorUpdateUserAllProfileTitle: t("errorUpdateUserAllProfileTitle"),
    successfulUpdateUserAllProfileTitle: t("successfulUpdateUserAllProfileTitle"),
    userDisplayName: t("userDisplayName"),
    userProfile: t("userProfile"),
    displayName: t("displayName"),
    username: t("username"),
    bio: t("bio"),
    publicEmail: t("publicEmail"),
    pronouns: t("pronouns"),
    relatedLinks: t("relatedLinks"),
    save: t("save"),
    link: t("link"),
    tellUsALittleBitAboutYourself: t("tellUsALittleBitAboutYourself")
  };
  return <Profile t={userProfileSettingTranslate}></Profile>;
}
