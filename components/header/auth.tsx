"use client";

import { useDisclosure } from "@mantine/hooks";
import { LoginComponents } from "./login";
import { SignupComponents } from "./signup";

// set t type
type language = {
  logIn: string;
  signUp: string;
  username: string;
  password: string;
  email: string;
  typeUsername: string;
  typePassword: string;
  typeEmail: string;
  signInToReturnone: string;
  signUpForReturnone: string;
  iAgreeTerms: string;
  alreadyHaveAccount: string;
  noAccount: string;
  createOne: string;
  orLoginWith: string;
  orSignupWith: string;
  confirmPassword: string;
  invalidEmail: string;
  passwordIsTooWeak: string;
  passwordDidNotMatch: string;
  invalidUsername: string;
  usernameHasBeenUse: string;
  emailHasBeenUse: string;
  anUnexpectedErrorOccurred: string;
  pleaseTryAgainLater: string;
  pleaseEnterAUsername: string;
  rename: string;
  successfulOauthSignup: string;
  successfulOauthsignupMessage: string;
  pleaseUpdateYourName: string;
  successfulLogin: string;
  successfulLoginMessage: string;
  invalidEmailOrPassword: string;
};

// whole components
export function SignupLogin({ t }: { t: language }) {
  const [signupOppened, { toggle: signupOpen, close: signupClose }] =
    useDisclosure(false);
  const [loginOppened, { toggle: loginOpen, close: loginClose }] =
    useDisclosure(false);
  return (
    <>
      <LoginComponents
        t={t}
        loginOppened={loginOppened}
        loginOpen={loginOpen}
        loginClose={loginClose}
        signupOpen={signupOpen}
      />
      <SignupComponents
        t={t}
        signupOppened={signupOppened}
        signupOpen={signupOpen}
        signupClose={signupClose}
        loginOpen={loginOpen}
      />
    </>
  );
}
