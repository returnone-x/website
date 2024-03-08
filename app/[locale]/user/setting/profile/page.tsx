import { Profile } from "@/components/user/profile/profileGetData";
import { useTranslations } from "next-intl";

export default function UserProfileSetting() {
  const t = useTranslations("UserProfileSetting");
  const userProfileSettingTranslate = {
    invalidUsername: t("invalidUsername"),
    usernameHasBeenUse: t("usernameHasBeenUse"),
    pleaseEnterAUsername: t("pleaseEnterAUsername"),
    errorWhenUpdateUserAllNameTitle: t("errorWhenUpdateUserAllNameTitle"),
    errorWhenUpdateUserAllName: t("errorWhenUpdateUserAllName"),
    SuccessfulUpdateUserAllNameTitle: t("SuccessfulUpdateUserAllNameTitle")
  };
  return <Profile t={userProfileSettingTranslate}></Profile>;
}
