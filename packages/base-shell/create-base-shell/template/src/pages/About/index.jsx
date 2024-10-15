import React from "react";
import { useIntl } from "react-intl";

export const AboutPage = () => {
  const intl = useIntl();
  return <div>{intl.formatMessage({ id: "about" })}</div>;
};
