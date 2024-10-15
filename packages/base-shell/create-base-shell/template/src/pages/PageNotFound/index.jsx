import React from "react";
import { useIntl } from "react-intl";

export const PageNotFound = () => {
  const intl = useIntl();
  return <div>{intl.formatMessage({ id: "page_not_found" })}</div>;
};
