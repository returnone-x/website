import { HeaderComponent } from "@/components/header/Header";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import React from "react";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Header");
  const signipLoginTranslate = {
    signUp: t("signUp"),
    logIn: t("logIn"),
    search: t("search"),
    blog: t("blog"),
    aboutUs: t("aboutUs"),
    ask: t("ask"),
    username: t("username"),
    password: t("password"),
    email: t("email"),
    confirmPassword: t("confirmPassword"),
    typeUsername: t("typeUsername"),
    typePassword: t("typePassword"),
    typeEmail: t("typeEmail"),
    signInToReturnone: t("signInToReturnone"),
    signUpForReturnone: t("signUpForReturnone"),
    iAgreeTerms: t("iAgreeTerms"),
    alreadyHaveAccount: t("alreadyHaveAccount"),
    noAccount: t("noAccount"),
    createOne: t("createOne"),
    orLoginWith: t("orLoginWith"),
    orSignupWith: t("orSignupWith"),
    invalidEmail: t("invalidEmail"),
    passwordIsTooWeak: t("passwordIsTooWeak"),
    passwordDidNotMatch: t("passwordDidNotMatch"),
    invalidUsername: t("invalidUsername"),
    usernameHasBeenUse: t("usernameHasBeenUse"),
    emailHasBeenUse: t("emailHasBeenUse"),
    anUnexpectedErrorOccurred: t("anUnexpectedErrorOccurred"),
    pleaseTryAgainLater: t("pleaseTryAgainLater"),
    pleaseEnterAUsername: t("pleaseEnterAUsername"),
    rename: t("rename"),
    pleaseUpdateYourName: t("pleaseUpdateYourName"),
    successfulOauthSignup: t("successfulOauthSignup"),
    successfulOauthsignupMessage: t("successfulOauthsignupMessage"),
    successfulLogin: t("successfulLogin"),
    successfulLoginMessage: t("successfulLoginMessage"),
    invalidEmailOrPassword: t("invalidEmailOrPassword"),
    logout: t("logout"),
    profile: t("profile"),
  };
  return (
    <>
      <HeaderComponent t={signipLoginTranslate} />
      {children}
    </>
  );
}
