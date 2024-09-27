import React from "react";
import { useIntl } from "react-intl";
import { useSimpleValues } from "@ecronix/base-shell/providers/SimpleValues";
import { useOnline } from "@ecronix/base-shell/providers/Online";

const HomePage = () => {
  const intl = useIntl();
  const isOnline = useOnline();
  const { setValue, getValue, clearAll } = useSimpleValues();

  const simpleNValueKey = "nkey";
  const simplePValueKey = "pKey";

  return (
    <div>
      Non persistent: {getValue(simpleNValueKey, "empty")}
      <br />
      <br />
      Persistent: {getValue(simplePValueKey, "empty")}
      <br />
      {isOnline ? "online" : "offline"}
      <br />
      <br />
      <button
        onClick={(e) => {
          setValue(simpleNValueKey, "non persistent value");
        }}
      >
        SET NON PERSISTENT
      </button>
      <br />
      <br />
      <button
        onClick={(e) => {
          setValue(simplePValueKey, "persistent value", true);
        }}
      >
        SET PERSISTENT
      </button>
      <br />
      <br />
      <button
        onClick={(e) => {
          //clearValue(simpleNValueKey)
          //clearValue(simplePValueKey)
          //or
          clearAll();
        }}
      >
        CLEAR
      </button>
      <br />
      {intl.formatMessage({ id: "home" })}
      <br />
    </div>
  );
};
export default HomePage;
