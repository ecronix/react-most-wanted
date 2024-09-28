import React, { useEffect } from "react";
import { Form as FinalForm } from "react-final-form";
import { useFirebasePaths } from "@ecronix/rmw-shell";
import { useAuth } from "@ecronix/base-shell";
import arrayMutators from "final-form-arrays";
import { getDatabase, ref, push, set, update } from "firebase/database";

export default function FirebaseFromContainer({
  uid,
  path = "none",
  handleSubmit = () => {},
  Form,
  grants = {},
  formProps = {},
  initialValues = {},
  parseValues = (v) => v,
  setSubmit,
  ...rest
}) {
  const { watchPath, clearPath, getPath } = useFirebasePaths();
  const { auth } = useAuth();
  const { isAuthGranted = () => false } = auth || {};

  const databasePath = `${path}/${uid}`;
  const data = getPath(databasePath) || initialValues;

  useEffect(() => {
    if (uid) {
      watchPath(databasePath);
    }
    return () => clearPath(databasePath);
  }, [path, watchPath, clearPath, databasePath, uid]);

  return (
    <FinalForm
      mutators={{ ...arrayMutators }}
      keepDirtyOnReinitialize
      onSubmit={async (rawValues) => {
        let newUid = false;
        let values = rawValues;
        if (parseValues) {
          values = parseValues(values);
        }

        console.log("values", values);

        if (uid) {
          await set(ref(getDatabase(), `${path}/${uid}`), values);
        } else {
          if (isAuthGranted(auth, grants.create)) {
            const snap = await await push(ref(getDatabase(), path), values);
            newUid = snap.key;
          } else {
            return;
          }
        }

        handleSubmit(values, newUid);
      }}
      initialValues={data}
      render={({ handleSubmit, submit, ...r }) => {
        if (!submit && setSubmit) {
          setSubmit(() => handleSubmit);
        }

        return <Form handleSubmit={handleSubmit} {...r} {...formProps} />;
      }}
      {...rest}
    />
  );
}
