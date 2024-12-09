import Avatar from "@mui/material/Avatar";
import Camera from "@mui/icons-material/CameraAlt";
import Delete from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import InputBase from "@mui/material/InputBase";
import NotificationsOff from "@mui/icons-material/NotificationsOff";
import Notifications from "@mui/icons-material/Notifications";
import { Page } from "@ecronix/material-ui-shell";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import Save from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import { IconButton } from "@mui/material";
import { useAuth, useConfig } from "@ecronix/base-shell";
import { useIntl } from "react-intl";
import { useQuestionsDialog } from "@ecronix/material-ui-shell";
import { ImageUploadDialogContainer } from "@ecronix/rmw-shell";
import {
  GoogleIcon,
  FacebookIcon,
  GitHubIcon,
  TwitterIcon,
} from "@ecronix/rmw-shell";
import {
  getAuth,
  updateProfile,
  FacebookAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  PhoneAuthProvider,
  TwitterAuthProvider,
  linkWithPopup,
  deleteUser,
  updateCurrentUser,
  reload,
  Auth,
  User,
} from "firebase/auth";
import { getDatabase, set, remove, ref } from "firebase/database";
import { useFirebaseMessaging } from "@ecronix/rmw-shell";

const uuid = () => {
  const url = URL.createObjectURL(new Blob());
  const [id] = url.toString().split("/").reverse();
  URL.revokeObjectURL(url);
  return id;
};

export function MyAccountPage() {
  const intl = useIntl();
  const { appConfig } = useConfig();
  const { firebase: firebaseConfig } = appConfig || {};
  const { firebaseuiProps } = firebaseConfig || {};
  const { signInOptions = [] } = firebaseuiProps || {};
  const { openDialog } = useQuestionsDialog();
  const database = getDatabase();

  const { auth, updateAuth } = useAuth();
  const {
    photoURL: currentPhoroURL = "",
    displayName: currentDisplayName = "",
    email = "",
    notificationsDisabled = false,
  } = auth || {};
  const [displayName, setDisplayName] = useState(currentDisplayName);
  const [photoURL, setPhotoURL] = useState(currentPhoroURL);
  const [isImageDialogOpen, setImageDialogOpen] = useState(false);
  const { requestPermission } = useFirebaseMessaging();

  const hasChange =
    displayName !== currentDisplayName || photoURL !== currentPhoroURL;

  const handleImageChange = (image: string) => {
    setPhotoURL(image);
  };

  const getProviderIcon = (id: string) => {
    if (id === "google.com") {
      return <GoogleIcon />;
    }
    if (id === "facebook.com") {
      return <FacebookIcon />;
    }
    if (id === "github.com") {
      return <GitHubIcon />;
    }
    if (id === "twitter.com") {
      return <TwitterIcon />;
    }

    return null;
  };

  const getProvider = (provider: string) => {
    if (provider.indexOf("facebook") > -1) {
      return new FacebookAuthProvider();
    }
    if (provider.indexOf("github") > -1) {
      return new GithubAuthProvider();
    }
    if (provider.indexOf("google") > -1) {
      return new GoogleAuthProvider();
    }
    if (provider.indexOf("twitter") > -1) {
      return new TwitterAuthProvider();
    }
    if (provider.indexOf("phone") > -1) {
      //@ts-ignore
      return new PhoneAuthProvider();
    }

    throw new Error("Provider is not supported!");
  };

  const handleSave = async () => {
    updateProfile(getAuth().currentUser as User, { displayName, photoURL });
    updateAuth({ ...auth, displayName, photoURL });
    await updateCurrentUser(getAuth(), getAuth().currentUser);
    await reload(getAuth().currentUser as User);
  };

  const isLinkedWithProvider = (provider: string) => {
    try {
      return (
        auth &&
        auth.providerData &&
        auth.providerData.find((p) => {
          return p.providerId === provider;
        }) !== undefined
      );
    } catch (e) {
      return false;
    }
  };

  const linkUserWithPopup = (p: string) => {
    const provider = getProvider(p);

    linkWithPopup(getAuth().currentUser as User, provider).then(
      () => {
        updateAuth({ ...auth, ...getAuth().currentUser });
      },
      (e) => {
        console.warn(e);
      }
    );
  };

  const openDeleteDialog = () => {
    openDialog({
      title: intl.formatMessage({
        id: "delete_account_dialog_title",
        defaultMessage: "Delete Account?",
      }),
      message: intl.formatMessage({
        id: "delete_account_dialog_message",
        defaultMessage:
          "This Account and all related data to it will be deleted permanently. Do you want to proceed with the deletion?",
      }),
      action: intl.formatMessage({
        id: "delete_account_dialog_action",
        defaultMessage: "DELETE ACCOUNT",
      }),
      handleAction: handleDelete,
    });
  };

  const openReauthenticateDialog = () => {
    openDialog({
      title: intl.formatMessage({
        id: "reauthenticate_account_dialog_title",
        defaultMessage: "Reauthentication required",
      }),
      message: intl.formatMessage({
        id: "reauthenticate_account_dialog_message",
        defaultMessage:
          "To ensure that you are the real owner of this account a reauthentication is required. For that you need to logout and login into the application. By pressing the REAUTHENTICATION button you will be logged out automaticaly. After you login afain you can delete your account!",
      }),
      action: intl.formatMessage({
        id: "reauthenticate_account_dialog_action",
        defaultMessage: "REAUTHENTICATE",
      }),
      handleAction: (hc: () => void) => {
        //@ts-ignore
        getAuth().currentUser.signOut();
        hc();
      },
    });
  };

  const handleDelete = async (handleClose: () => void) => {
    try {
      await deleteUser(getAuth().currentUser as User);
    } catch ({ code }: any) {
      if (code === "auth/requires-recent-login") {
        openReauthenticateDialog();
      }
    }

    handleClose();
  };

  const handleDisableNotifications = async () => {
    await set(ref(database, `disable_notifications/${auth.uid}`), true);
    await remove(ref(database, `notification_tokens/${auth.uid}`));
  };

  const handleEnableNotifications = async () => {
    await set(ref(database, `disable_notifications/${auth.uid}`), null);

    updateAuth({ ...auth, notificationsDisabled: false });

    requestPermission();
    window.location.reload();
  };

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: "my_account",
        defaultMessage: "My Account",
      })}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Paper
          elevation={3}
          style={{
            position: "relative",
            //width: 300,
            //height: 300,
            borderRadius: 18,
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Fab
            size="medium"
            style={{
              position: "absolute",
              top: 30,
              right: -16,
            }}
            onClick={
              notificationsDisabled
                ? handleEnableNotifications
                : handleDisableNotifications
            }
            color="primary"
            aria-label="notifications"
          >
            {!notificationsDisabled && <NotificationsOff />}
            {notificationsDisabled && <Notifications />}
          </Fab>
          <Fab
            size="medium"
            style={{ position: "absolute", bottom: 40, right: -16 }}
            onClick={openDeleteDialog}
            color="secondary"
            aria-label="delete"
          >
            <Delete />
          </Fab>

          <Fab
            onClick={() => setImageDialogOpen(true)}
            style={{
              position: "absolute",
              zIndex: 99,
              top: 50,
              marginRight: -60,
            }}
            color="primary"
            aria-label="save"
            size="small"
          >
            <Camera />
          </Fab>
          <Avatar
            style={{ width: 120, height: 120, marginTop: -40 }}
            alt="User Picture"
            src={photoURL}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: 18,
              marginBottom: 18,
            }}
          >
            <InputBase
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              inputProps={{
                "aria-label": "naked",
                style: {
                  fontSize: 26,
                  fontWeight: "bold",
                  textAlign: "center",
                },
              }}
            />

            <Typography variant="h6">{email}</Typography>
            <div style={{ margin: 18, display: "flex", alignItems: "center" }}>
              {signInOptions.map((so: any) => {
                return getProviderIcon(so) ? (
                  <IconButton
                    disabled={isLinkedWithProvider(so)}
                    color="primary"
                    key={so}
                    onClick={() => linkUserWithPopup(so)}
                  >
                    {getProviderIcon(so)}
                  </IconButton>
                ) : null;
              })}
            </div>
          </div>
          <Zoom in={hasChange}>
            <Fab
              onClick={handleSave}
              style={{ marginBottom: -20 }}
              color="primary"
              aria-label="save"
            >
              <Save />
            </Fab>
          </Zoom>
        </Paper>

        <ImageUploadDialogContainer
          isOpen={isImageDialogOpen}
          handleClose={() => setImageDialogOpen(false)}
          handleCropSubmit={handleImageChange}
          path={`users/${auth.uid}/${uuid()}.jpeg`}
        />
      </div>
    </Page>
  );
}
