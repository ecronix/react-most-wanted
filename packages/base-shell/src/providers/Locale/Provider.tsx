import React, { useState, useEffect } from "react";
import Context from "./Context";

export interface LocaleProviderProps {
  children: React.ReactNode;
  defaultLocale?: string;
  persistKey?: string;
}

const Provider: React.FC<LocaleProviderProps> = ({
  children,
  defaultLocale = "en",
  persistKey = "locale",
}) => {
  const persistLocale = localStorage.getItem(persistKey);
  const [locale, setLocale] = useState(persistLocale || defaultLocale);

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, locale);
    } catch (error) {
      console.warn(error);
    }
  }, [locale, persistKey]);

  return (
    <Context.Provider value={{ locale, setLocale }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
