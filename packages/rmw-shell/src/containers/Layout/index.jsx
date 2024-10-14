import { LayoutContainer as MaterialUiLayoutContainer } from "@ecronix/material-ui-shell";
import { FirebaseContainer } from "@ecronix/rmw-shell";
import React from "react";

export function LayoutContainer({ children }) {
  return (
    <MaterialUiLayoutContainer>
      <FirebaseContainer>{children}</FirebaseContainer>
    </MaterialUiLayoutContainer>
  );
}
