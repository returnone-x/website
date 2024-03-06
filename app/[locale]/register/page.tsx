import { LoginComponents } from "@/components/auth/login";
import { SignupComponent } from "@/components/auth/signup";
import { useTranslations } from "next-intl";

export default function SignupPage() {
    const t = useTranslations("Auth")
    const SignupTranslate = {
      signUpForReturnone: t("signUpForReturnone"),
      iAgreeTerms: t("iAgreeTerms"),
      passwordIsTooWeak: t("passwordIsTooWeak"),
      passwordDidNotMatch: t("passwordDidNotMatch"),
      invalidUsername: t("invalidUsername"),
      pleaseEnterAUsername: t("pleaseEnterAUsername"),
      usernameHasBeenUse: t("usernameHasBeenUse"),
      successfulOauthSignup: t("successfulOauthSignup"),
      successfulOauthsignupMessage: t("successfulOauthsignupMessage"),
      emailHasBeenUse: t("emailHasBeenUse"),
      alreadyHaveAccount: t("alreadyHaveAccount"),
      orSignupWith: t("orSignupWith"),
      rename: t("rename"),
      pleaseUpdateYourName: t("pleaseUpdateYourName"),
      typeUsername: t("typeUsername"),
      username: t("username"),
      confirmPassword: t("confirmPassword"),
      invalidEmail: t("invalidEmail"),
      successfulLoginMessage: t("successfulLoginMessage"),
      invalidEmailOrPassword: t("invalidEmailOrPassword"),
      anUnexpectedErrorOccurred: t("anUnexpectedErrorOccurred"),
      pleaseTryAgainLater: t("pleaseTryAgainLater"),
      signInToReturnone: t("signInToReturnone"),
      typeEmail: t("typeEmail"),
      password: t("password"),
      logIn: t("logIn"),
      signUp: t("signUp"),
      email: t("email"),
      typePassword: t("typePassword"),
      orLoginWith: t("orLoginWith"),
      noAccount: t("noAccount"),
      createOne: t("createOne"),
      successfulLogin: t("successfulLogin"),
    }

  return (
      <SignupComponent t={SignupTranslate}></SignupComponent>
  );
}
