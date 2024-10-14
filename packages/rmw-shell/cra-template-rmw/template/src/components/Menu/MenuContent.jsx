import React from "react";
import {
  Scrollbar,
  SelectableMenuListContainer,
} from "@ecronix/material-ui-shell";
import {
  useAddToHomeScreen,
  useAuth,
  useConfig,
  useLocale,
} from "@ecronix/base-shell";
import { useNavigate, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { useMenu, useTheme as useAppTheme } from "@ecronix/material-ui-shell";
import getMenuItems from "../../config/menuItems";

const Menu = (props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const menuContext = useMenu();
  const a2HSContext = useAddToHomeScreen();
  const { toggleThis, isMiniMode, isMiniSwitchVisibility } = menuContext || {};
  const { appConfig } = useConfig();
  const { setLocale, locale = "en" } = useLocale();
  const themeContext = useAppTheme();

  const menuItems = getMenuItems({
    intl,
    locale,
    updateLocale: setLocale,
    menuContext,
    themeContext,
    appConfig,
    a2HSContext,
    auth,
    navigate,
    ...props,
  }).filter((item) => {
    return item.visible !== false;
  });

  const index = location ? location.pathname : "/";

  const handleChange = (event, index) => {
    if (index !== undefined) {
      toggleThis("isMobileMenuOpen", false);
    }
    if (index !== undefined && index !== Object(index)) {
      navigate(index);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        /*  direction: isRTL ? 'rtl' : 'ltr' */
      }}
    >
      <Scrollbar style={{ flex: 1 }}>
        <SelectableMenuListContainer
          key={isMiniSwitchVisibility + themeContext.isRTL}
          onIndexChange={handleChange}
          useMinified={isMiniMode}
          items={menuItems}
          index={index}
        />
      </Scrollbar>
    </div>
  );
};

export default Menu;
