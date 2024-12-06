import * as firebaseui from "firebaseui";
import { AuthUIContainer } from "@ecronix/rmw-shell";
import { Page, togglerTypes } from "@ecronix/material-ui-shell";
import React from "react";
import { Helmet } from "react-helmet";
import { useConfig } from "@ecronix/base-shell";
import { useIntl } from "react-intl";
import { useMenu } from "@ecronix/material-ui-shell";
import { useLocation } from "react-router-dom";

export function SignInPage() {
  const intl = useIntl();
  const { appConfig } = useConfig();
  const { firebase = {}, auth } = appConfig || {};
  const { redirectTo = "/" } = auth || {};
  const { firebaseuiProps = {} } = firebase;
  const { toggleThis } = useMenu() || {};
  let location = useLocation();
  let from = new URLSearchParams(location.search).get("from") || redirectTo;

  const uiConfig = {
    signInSuccessUrl: from,
    signInFlow: "popup",
    callbacks: {
      signInSuccessWithAuthResult: () => {
        toggleThis(togglerTypes.isAuthMenuOpen, false);
        // To avoid page reload on single page applications
        return false;
      },
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    ...firebaseuiProps,
  };

  return (
    <Page pageTitle={intl.formatMessage({ id: "sign_in" })}>
      <Helmet>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.css"
        />
      </Helmet>
      <AuthUIContainer uiConfig={uiConfig} />
    </Page>
  );
}
