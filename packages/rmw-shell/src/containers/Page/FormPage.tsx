import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Page } from "@ecronix/material-ui-shell";
import React, { useState } from "react";
import Save from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { useFirebasePaths } from "@ecronix/rmw-shell";
import { useQuestionsDialog } from "@ecronix/material-ui-shell";
import { useAuth } from "@ecronix/base-shell";
import { FirebaseFromContainer } from "@ecronix/rmw-shell";
import { getDatabase, ref, set } from "firebase/database";

type FormPageContainerProps = {
  uid: string;
  path: string;
  getPageProps: () => {};
  handleDelete: () => {};
  deleteDialogProps: Object;
  grants: {
    create?: string;
    delete?: string;
  }; // TODO Check because in config grants are string[]
  initialValues: Object;
  useSave: boolean;
  useDelete: boolean;
  alwaysAllowSave: boolean;
  alwaysAllowDelete: boolean;
};
export function FormPageContainer(props: FormPageContainerProps) {
  const {
    uid,
    path = "none",
    getPageProps = () => {},
    handleDelete = () => {},
    deleteDialogProps = {},
    grants = {},
    initialValues = {},
    useSave = true,
    useDelete = true,
    alwaysAllowSave = false,
    alwaysAllowDelete = false,
  } = props;
  const navigate = useNavigate();
  const { openDialog } = useQuestionsDialog();
  const { getPath } = useFirebasePaths();
  const { auth, isAuthGranted = () => false } = useAuth();
  const [submit, setSubmit] = useState(false);
  const db = getDatabase();

  const databasePath = `${path}/${uid}`;
  const data = getPath(databasePath) || initialValues;

  const openDeleteDialog = () => {
    openDialog({
      handleAction: async (handleClose: () => void) => {
        await set(ref(db, `${path}/${uid}`), null);
        handleClose();
        handleDelete();
      },
      ...deleteDialogProps,
    });
  };

  return (
    <Page
      onBackClick={() => {
        navigate(-1);
      }}
      appBarContent={
        <div>
          {useSave && (
            <IconButton
              disabled={
                !isAuthGranted(auth, grants.create!) && !alwaysAllowSave
              }
              color="inherit"
              onClick={(e) => {
                submit(e);
              }}
            >
              <Save />
            </IconButton>
          )}

          {useDelete && (
            <IconButton
              disabled={
                !uid ||
                (!isAuthGranted(auth, grants.delete!) && !alwaysAllowDelete)
              }
              color="inherit"
              onClick={() => {
                openDeleteDialog();
              }}
            >
              <Delete />
            </IconButton>
          )}
        </div>
      }
      {...getPageProps({ values: data, submit })}
    >
      <FirebaseFromContainer setSubmit={setSubmit} submit={submit} {...props} />
    </Page>
  );
}
