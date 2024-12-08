import { DocumentData } from "firebase/firestore";

export * from "./Firebase/Cols";
export * from "./Firebase/Lists";
export * from "./Firebase/Storage";
export * from "./Firebase/Messaging";
export * from "./Firebase/Docs";
export * from "./Firebase/Paths";
export type ActionTypeBase = {
  payload?: any;
  value?: string | DocumentData;
  isLoading?: boolean;
  error?: Error;
  hasError?: boolean;
  path: string;
};
