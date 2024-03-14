import { GetQuestions } from "@/api/question/getQuestions";
import { GetUserDetil } from "@/api/user/profile/getUserDetil";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ProfileLayout } from "./profile";

export type UserProfileSettingLanguage = {
  invalidUsername: string,
  usernameHasBeenUse: string,
  pleaseEnterAUsername: string,
  errorUpdateUserAllName: string,
  errorUpdateUserAllNameTitle: string,
  successfulUpdateUserAllNameTitle: string,
  invalidDisplayName: string,
  invalidBio: string,
  invalidPublicEmail: string,
  invalidPronouns: string,
  invalidRelatedLinks: string,
  errorUpdateUserAllProfile: string
  errorUpdateUserAllProfileTitle: string,
  successfulUpdateUserAllProfileTitle: string,
  userDisplayName: string,
  userProfile: string,
  displayName: string,
  username: string,
  bio: string,
  publicEmail: string,
  pronouns: string,
  relatedLinks: string,
  save: string,
  link: string,
  tellUsALittleBitAboutYourself: string,
}

export async function Profile({
  t,
}: {
  t: UserProfileSettingLanguage;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const userSettingDetil = await GetQuestionDetill(
    accessToken ? accessToken.name + "=" + accessToken.value : ""
  );
  if (userSettingDetil === "") {
    return notFound();
  }

  return (
    <>
    <ProfileLayout userSettingDetil={userSettingDetil} t={t}></ProfileLayout>
    </>
  );
}

async function GetQuestionDetill(accessToken: string) {
  const res = await GetUserDetil(accessToken);
  if (res.status != 200) {
    return "";
  } else {
    return res.data;
  }
}