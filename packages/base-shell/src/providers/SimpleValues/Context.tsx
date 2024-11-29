import React from "react";

export interface SimpleValuesContextType {
  /**
   * Sets a value in the context.
   * @param params - The parameters to set a value.
   * @param params.key - The key to identify the value.
   * @param params.value - The value to set.
   * @param boolean params.persist - Whether to persist the value (e.g., in local storage). Defaults to 'false'.
   */
  setValue: (key: string, value: any, persist?: boolean) => void;

  /**
   * Gets a value from the context by key.
   * @param key - The key to retrieve the value for.
   * @returns The value corresponding to the key.
   */
  getValue: (key: string, defaultValue?: any) => string;

  /**
   * Clears a value from the context by key.
   * @param key - The key to clear the value for.
   */
  clearValue: (key: string) => void;

  /**
   * Clears all values from the context.
   */
  clearAll: () => void;
}

const Context = React.createContext<SimpleValuesContextType | undefined>(
  undefined
);

export default Context;
