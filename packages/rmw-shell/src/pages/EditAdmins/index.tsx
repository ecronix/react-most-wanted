import React, { useEffect } from "react";
import { useFirebaseLists } from "@ecronix/rmw-shell";
import { ListPage } from "@ecronix/material-ui-shell";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@ecronix/base-shell";
import { UserRow } from "@ecronix/rmw-shell";
import { getDatabase, ref, set } from "firebase/database";

export function EditAdminsPage() {
  const { watchList, getList, clearList, isListLoading } = useFirebaseLists();
  const { auth } = useAuth();
  const intl = useIntl();
  const navigate = useNavigate();
  const { uid } = useParams();
  const groupAdminsPath = `group_chats/${uid}/admins`;
  const db = getDatabase();

  useEffect(() => {
    watchList("users");
    watchList("admins");
    watchList(groupAdminsPath);
    return () => {
      clearList(groupAdminsPath);
    };
  }, [watchList, clearList, groupAdminsPath]);

  const admins = getList("admins");
  const members = getList(groupAdminsPath);

  const list = getList("users")
    .map(({ key, val }) => {
      return { key, ...val };
    })
    .filter((u) => u.key !== auth.uid);

  const isChecked = (key: string) => {
    return members.find((m) => m.key === key);
  };

  const handleRowClick = async (user: any) => {
    await set(
      //@ts-ignore
      ref(db, groupAdminsPath).child(user.key),
      isChecked(user.key) ? null : true
    );
  };

  return (
    <React.Fragment>
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
              isChecked={isChecked(p.data.key)}
            />
          );
        }}
        listProps={{ itemSize: 82 }}
        getPageProps={(list) => {
          return {
            pageTitle: intl.formatMessage({
              id: "edit_admins",
              defaultMessage: "Edit admins",
            }),
            isLoading: isListLoading("users"),
            onBackClick: () => {
              navigate(-1);
            },
          };
        }}
      />
    </React.Fragment>
  );
}
