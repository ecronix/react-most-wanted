import React, { useEffect } from "react";
import { useFirebaseLists, UserRowData } from "@ecronix/rmw-shell";
import { ListPage } from "@ecronix/material-ui-shell";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@ecronix/base-shell";
import { UserRow } from "@ecronix/rmw-shell";
import { getDatabase, ref, set } from "firebase/database";

export function EditMembersPage() {
  const { watchList, getList, clearList, isListLoading } = useFirebaseLists();
  const { auth } = useAuth();
  const intl = useIntl();
  const navigate = useNavigate();
  const { uid } = useParams();
  const groupMembersPath = `group_chats/${uid}/members`;
  const db = getDatabase();

  useEffect(() => {
    watchList("users");
    watchList("admins");
    watchList(groupMembersPath);
    return () => {
      clearList(groupMembersPath);
    };
  }, [watchList, clearList, groupMembersPath]);

  const admins = getList("admins");
  const members = getList(groupMembersPath);

  const list = getList("users")
    .map(({ key, val }) => {
      return { key, ...val };
    })
    .filter((u) => u.key !== auth.uid);

  const isChecked = (key: string) => {
    return members.find((m) => m.key === key);
  };

  const handleRowClick = async (user: UserRowData) => {
    await set(
      // TODO .child does not exist on ref()
      // @ts-ignore
      ref(db, groupMembersPath).child(user.key),
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
              id: "edit_members",
              defaultMessage: "Edit members",
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
