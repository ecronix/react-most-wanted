import React, { useEffect, useState } from "react";
import { useFirebaseLists, useFirebasePaths } from "@ecronix/rmw-shell";
import { ListPage } from "@ecronix/material-ui-shell";
import { useIntl } from "react-intl";
import Fab from "@mui/material/Fab";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@ecronix/base-shell";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import { Page } from "@ecronix/material-ui-shell";
import { UserRow } from "@ecronix/rmw-shell";
import { getDatabase, ref, update, push, set } from "firebase/database";

export function GroupChatPage() {
  const { watchList, getList, isListLoading } = useFirebaseLists();
  const { watchPath, getPath, clearPath } = useFirebasePaths();
  const { auth } = useAuth();
  const intl = useIntl();
  const navigate = useNavigate();
  const { uid = false } = useParams();
  const [selected, setSelected] = useState<Record<string, any>>({});
  const [step, setStep] = useState(uid !== false ? 1 : 0);
  const db = getDatabase();
  const { name: currentName = "" } = getPath(`group_chats/${uid}`, {}) || {};
  const [name, setName] = useState("");

  useEffect(() => {
    watchList("users");
    watchList("admins");

    if (uid) {
      watchPath(`group_chats/${uid}`);
    }

    return () => {
      if (uid) {
        clearPath(`group_chats/${uid}`);
      }
    };
  }, [watchList, uid, watchPath, clearPath]);

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  const admins = getList("admins");

  const list = getList("users")
    .map(({ key, val }) => {
      return { key, ...val };
    })
    .filter((u) => u.key !== auth.uid);

  const handleRowClick = (user) => {
    const key = user.key;

    if (!selected[key]) {
      setSelected({ ...selected, [key]: user });
    } else {
      const { [key]: removed, ...rest } = selected;
      setSelected(rest);
    }
  };

  const handleNextClick = async () => {
    if (step === 0) {
      setStep(1);
    } else {
      if (uid) {
        await update(ref(db, `group_chats/${uid}`), {
          name,
        });

        navigate("/chats");
      } else {
        let members = { [auth.uid]: true };

        Object.entries(selected).map((e) => {
          const [key] = e;

          members[key] = true;
          return e;
        });
        const snap = await push(ref(db, `group_chats`));
        await set(ref(db, `group_chats/${snap.key}/admins/${auth.uid}`), true);
        await update(ref(db, `group_chats/${snap.key}`), { members, name });

        navigate("/chats");
      }
    }
  };

  return (
    <React.Fragment>
      {step === 0 && (
        <ListPage
          name="users"
          list={list}
          Row={(p) => {
            return (
              <UserRow
                {...p}
                admins={admins}
                handleRowClick={handleRowClick}
                hasCheckbox
                // isChecked={selected?[p.data.key]}
                isChecked={selected?.[p.data.key]}
              />
            );
          }}
          listProps={{ itemSize: 82 }}
          getPageProps={(list) => {
            return {
              pageTitle: intl.formatMessage({
                id: "select_users",
                defaultMessage: "Select Users",
              }),
              isLoading: isListLoading("users"),
              onBackClick: () => {
                navigate(-1);
              },
            };
          }}
        />
      )}
      {step === 1 && (
        <Page
          pageTitle={intl.formatMessage({
            id: "set_name",
            defaultMessage: "Set name",
          })}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper style={{ padding: 18 }}>
              <TextField
                name="name"
                placeholder={intl.formatMessage({
                  id: "group_name",
                  defaultMessage: "Group name",
                })}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Paper>
          </div>
        </Page>
      )}
      <div style={{ position: "absolute", bottom: 15, right: 35 }}>
        <Fab
          disabled={step === 1 && name === ""}
          color="secondary"
          onClick={handleNextClick}
        >
          <ArrowForward />
        </Fab>
      </div>
    </React.Fragment>
  );
}
