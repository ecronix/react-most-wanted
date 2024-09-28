import React from "react";
import { MarkdownPage } from "@ecronix/rmw-shell";
import { useIntl } from "react-intl";

export default function AboutPage() {
  const intl = useIntl();
  return (
    <MarkdownPage
      pageProps={{
        pageTitle: intl.formatMessage({ id: "about", defaultMessage: "About" }),
      }}
      path={
        "https://raw.githubusercontent.com/TarikHuber/react-most-wanted/master/README.md"
      }
    />
  );
}
