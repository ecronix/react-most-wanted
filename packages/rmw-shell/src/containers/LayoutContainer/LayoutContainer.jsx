import { LayoutContainer } from "@ecronix/material-ui-shell";
import FirebaseContainer from "../../containers/FirebaseContainer/FirebaseContainer";
import React from "react";

export default function ({ children }) {
  return (
    <LayoutContainer>
      <FirebaseContainer>{children}</FirebaseContainer>
    </LayoutContainer>
  );
}
