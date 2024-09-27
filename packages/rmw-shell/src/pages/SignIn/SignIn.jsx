import * as firebaseui from "firebaseui";
import AuthUI from "../../containers/AuthUI/AuthUI";
import { Page } from "@ecronix/material-ui-shell";
import React from "react";
import { Helmet } from "react-helmet";
import { useConfig } from "@ecronix/base-shell";
import { useIntl } from "react-intl";
import { useMenu } from "@ecronix/material-ui-shell";
import { useNavigate, useLocation } from "react-router-dom";

const SignIn = () => {
  const intl = useIntl();
  const { appConfig } = useConfig();
  const { firebase = {}, auth } = appConfig || {};
  const { redirectTo = "/" } = auth || {};
  const { firebaseuiProps = {} } = firebase;
  const { toggleThis } = useMenu() || {};
  let navigate = useNavigate();
  let location = useLocation();
  let from = new URLSearchParams(location.search).get("from") || redirectTo;

  const uiConfig = {
    signInSuccessUrl: from,
    signInFlow: "popup",
    callbacks: {
      signInSuccessWithAuthResult: () => {
        toggleThis("isAuthMenuOpen", false);
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
      <AuthUI uiConfig={uiConfig} />
    </Page>
  );
};

export default SignIn;
