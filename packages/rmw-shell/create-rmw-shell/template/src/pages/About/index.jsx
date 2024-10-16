import React from "react";
import { MarkdownPageContainer } from "@ecronix/rmw-shell";
import { useIntl } from "react-intl";

export default function AboutPage() {
  const intl = useIntl();
  return (
    <MarkdownPageContainer
      pageProps={{
        pageTitle: intl.formatMessage({ id: "about", defaultMessage: "About" }),
      }}
      path={
        "https://raw.githubusercontent.com/TarikHuber/react-most-wanted/master/README.md"
      }
    />
  );
}
