import App from "./containers/App/App";

// App
export default App;

export { default as AuthorizedRoute } from "./components/AuthorizedRoute";
export { default as UnauthorizedRoute } from "./components/UnauthorizedRoute";
export * from "./providers/AddToHomeScreen";
export * from "./providers/Auth";
export * from "./providers/Config";
export * from "./providers/Locale";
export * from "./providers/Online";
export * from "./providers/SimpleValues";
export * from "./providers/Update";
export * from "./utils/locale"