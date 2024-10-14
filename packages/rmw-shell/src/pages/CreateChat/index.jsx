import React, { useEffect, useState, useMemo } from "react";
import { useFirebaseLists } from "@ecronix/rmw-shell";
import { ListPage } from "@ecronix/material-ui-shell";
import { useIntl } from "react-intl";
import GroupAdd from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@ecronix/base-shell";
import { UserRow } from "@ecronix/rmw-shell";
import { getDatabase, ref, update } from "firebase/database";
import { useFilter } from "@ecronix/material-ui-shell";
import {
  collection,
  getFirestore,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export function CreateChatPage() {
  const { watchList, getList, isListLoading } = useFirebaseLists();
  const { auth } = useAuth();
  const intl = useIntl();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const { getFilter } = useFilter();
  const { search = {} } = getFilter("users");
  const searchValue = search.value;

  const runSearch = useMemo(
    () => async () => {
      const db = getFirestore();
      const ref = collection(db, "users");
      const q = query(
        ref,
        where("search", "array-contains", searchValue.toLowerCase() || ""),
      );
      const snap = await getDocs(q);

      const tempLlist = [];

      tempLlist.push({
        key: "new_group",
        displayName: intl.formatMessage({
          id: "group_chat",
          defaultMessage: "Group chat",
        }),
        secondaryText: intl.formatMessage({
          id: "create_group_chat",
          defaultMessage: "Create new group chat",
        }),
        search: searchValue,
        icon: <GroupAdd />,
        isGroup: true,
      });
      snap.forEach((doc) => {
        tempLlist.push({ key: doc.id, ...doc.data() });
      });

      setList(tempLlist);
    },
    [searchValue, intl],
  );

  useEffect(() => {
    if (searchValue && searchValue !== "") {
      runSearch();
    } else {
      setList([
        {
          key: "new_group",
          displayName: intl.formatMessage({
            id: "group_chat",
            defaultMessage: "Group chat",
          }),
          secondaryText: intl.formatMessage({
            id: "create_group_chat",
            defaultMessage: "Create new group chat",
          }),
          icon: <GroupAdd />,
          isGroup: true,
        },
      ]);
    }
  }, [searchValue, runSearch, intl, isListLoading]);

  useEffect(() => {
    watchList("admins");
  }, [watchList]);

  const admins = getList("admins");

  const handleRowClick = async (user) => {
    const { key, displayName, photoURL = "", isGroup } = user;

    if (isGroup) {
      navigate(`/group_chat`);
      return;
    }

    const userChatsRef = ref(getDatabase(), `/user_chats/${auth.uid}/${key}`);

    const chatData = {
      displayName,
      photoURL,
      lastMessage: "",
    };

    await update(userChatsRef, { ...chatData });

    navigate(`/chats/${key}`);
  };

  return (
    <ListPage
      name="users"
      list={list}
      Row={(p) => {
        return (
          <UserRow admins={admins} handleRowClick={handleRowClick} {...p} />
        );
      }}
      listProps={{ itemSize: 82 }}
      getPageProps={(list) => {
        return {
          pageTitle: intl.formatMessage({
            id: "chat_with",
            defaultMessage: "Chat with",
          }),
          isLoading: isListLoading("users"),
          onBackClick: () => {
            navigate(-1);
          },
        };
      }}
    />
  );
}
