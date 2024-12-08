import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Divider, IconButton } from "@mui/material";
import { useIntl } from "react-intl";
import {
  GoogleIcon,
  FacebookIcon,
  GitHubIcon,
  TwitterIcon,
} from "@ecronix/rmw-shell";
import { Page } from "@ecronix/material-ui-shell";
import { useFirebasePaths, useFirebaseLists } from "@ecronix/rmw-shell";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AccountBox from "@mui/icons-material/AccountBox";
import Lock from "@mui/icons-material/Lock";
import Person from "@mui/icons-material/Person";
import Email from "@mui/icons-material/Email";
import { GrantsListContainer, RolesListContainer } from "@ecronix/rmw-shell";
import Zoom from "@mui/material/Zoom";
import { SearchField, useFilter } from "@ecronix/material-ui-shell";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { getDatabase, ref, set } from "firebase/database";
import { AuthType } from "@ecronix/base-shell/dist/types/providers/Auth/Context";

export function UserPage() {
  const intl = useIntl();
  const navigate = useNavigate();
  const { watchPath, getPath } = useFirebasePaths();
  const { watchList, getList } = useFirebaseLists();
  const { uid, tab = "main" } = useParams();
  const { getFilter, setSearch } = useFilter();
  const { search = {} } = getFilter(tab);
  const { value: searchValue = "" } = search;

  const grantsPath = `user_grants/${uid}`;
  const rolesPath = `user_roles/${uid}`;

  const getProviderIcon = (id: string) => {
    if (id === "password") {
      return <Email />;
    }
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

  const path = `users/${uid}`;

  useEffect(() => {
    watchPath(path);
    watchList("admins");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const user = getPath(path);
  const admins = getList("admins");

  const {
    photoURL = "",
    displayName = "",
    email = "",
    providerData = [],
  } = user || {};

  let isAdmin = false;

  admins.map((a) => {
    if (a.key === uid) {
      isAdmin = true;
    }
    return a;
  });

  return (
    <Page
      onBackClick={() => {
        navigate(-1);
      }}
      pageTitle={intl.formatMessage({
        id: "user",
        defaultMessage: "User",
      })}
      appBarContent={
        <div>
          {tab !== "main" && (
            <Zoom key={tab} in={tab !== "main"}>
              <div>
                <SearchField
                  initialValue={searchValue}
                  onChange={(v) => {
                    setSearch(tab, v);
                  }}
                />
              </div>
            </Zoom>
          )}
        </div>
      }
      tabs={
        <Box>
          <Tabs
            value={tab}
            onChange={(e, t) => {
              navigate(`/users/${uid}/${t}`, { replace: true });
            }}
            centered
          >
            <Tab value="main" icon={<Person className="material-icons" />} />
            <Tab
              value="roles"
              icon={<AccountBox className="material-icons" />}
            />

            <Tab value="grants" icon={<Lock className="material-icons" />} />
          </Tabs>
          <Divider />
        </Box>
      }
    >
      <div style={{ height: "100%", overflow: "hidden" }}>
        <div style={{ height: "100%" }}>
          {tab === "main" && (
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
                  padding: 18,
                  minWidth: 250,
                }}
              >
                <Avatar
                  style={{ width: 120, height: 120, marginTop: -70 }}
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
                  <Typography variant="h4">{displayName}</Typography>
                  <Typography variant="h6">{email}</Typography>
                  <div
                    style={{
                      margin: 18,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {providerData.map((so: any) => {
                      return getProviderIcon(so.providerId) ? (
                        <IconButton color="primary" key={so}>
                          {getProviderIcon(so.providerId)}
                        </IconButton>
                      ) : null;
                    })}
                  </div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isAdmin}
                        onChange={() => {
                          try {
                            set(
                              ref(getDatabase(), `admins/${uid}`),
                              isAdmin ? null : true
                            );
                          } catch (error) {
                            console.warn(error);
                          }
                        }}
                        name="checkedA"
                      />
                    }
                    label={intl.formatMessage({
                      id: "administrator",
                      defaultMessage: "Administrator",
                    })}
                  />
                </div>
              </Paper>
            </div>
          )}
          {tab === "roles" && <RolesListContainer path={rolesPath} />}
          {tab === "grants" && <GrantsListContainer grantsPath={grantsPath} />}
        </div>
      </div>
    </Page>
  );
}
