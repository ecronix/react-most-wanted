import { Theme } from "@mui/material/styles";

export * from "./providers";
export * from "./pages";
export * from "./utils";
export * from "./containers";
export * from "./components";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}
