import Avatar from "@mui/material/Avatar";
import Chat from "../../containers/Chat";
import ChatIcon from "@mui/icons-material/Chat";
import Group from "@mui/icons-material/Group";
import Security from "@mui/icons-material/Security";
import Info from "@mui/icons-material/Info";
import People from "@mui/icons-material/People";
import Person from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Page, VirtualList } from "@ecronix/material-ui-shell";
import React, { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "@ecronix/base-shell";
import { useNavigate, useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { useLists } from "../../providers/Firebase/Lists";
import { useTheme } from "@mui/material/styles";
import { useTheme as useAppTheme } from "@ecronix/material-ui-shell";
import { useMessaging } from "../../providers/Firebase/Messaging";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Delete from "@mui/icons-material/Delete";
import History from "@mui/icons-material/History";
import {
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import moment from "moment";
import { getDatabase, ref, set } from "firebase/database";

const Row = ({ data, index, style }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { auth } = useAuth();
  const { isRTL } = useAppTheme();

  const {
    displayName = "",
    lastMessage = "",
    key,
    photoURL,
    path = "",
    lastCreated = "",
  } = data;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { uid = "" } = useParams();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteChat = async () => {
    await set(ref(getDatabase(), `user_chats/${auth.uid}/${key}`), null);
    handleClose();
  };

  const handleMarkAsUnread = async () => {
    await set(ref(getDatabase(), `user_chats/${auth.uid}/${key}/unread`), 1);
    handleClose();
  };

  return (
    <div key={key} style={{ ...style, direction: isRTL ? "rtl" : "ltr" }}>
      {/* james- revisit this code */}
      <ListItem
        button
        selected={key === uid}
        alignItems="flex-start"
        style={{ height: 72 }}
        onClick={() => {
          navigate(`/chats/${key}`);
        }}
      >
        <ListItemAvatar>
          <Avatar src={photoURL}>
            {path !== "" && <Group />}
            {path === "" && <Person />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={displayName}
          secondary={
            <div
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: 170,
                whiteSpace: "nowrap",
              }}
            >
              {lastMessage}
            </div>
          }
        />
        <ListItemSecondaryAction>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <IconButton
              size="small"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHoriz />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {path !== "" && (
                <MenuItem
                  onClick={() => {
                    navigate(`/group_chat/${key}`);
                  }}
                >
                  <ListItemIcon>
                    <Info />
                  </ListItemIcon>

                  {intl.formatMessage({
                    id: "info",
                    defaultMessage: "Info",
                  })}
                </MenuItem>
              )}
              {path !== "" && (
                <MenuItem
                  onClick={() => {
                    navigate(`/edit_members/${key}`);
                  }}
                >
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>

                  {intl.formatMessage({
                    id: "members",
                    defaultMessage: "Members",
                  })}
                </MenuItem>
              )}
              {path !== "" && (
                <MenuItem
                  onClick={() => {
                    navigate(`/edit_admins/${key}`);
                  }}
                >
                  <ListItemIcon>
                    <Security />
                  </ListItemIcon>

                  {intl.formatMessage({
                    id: "admins",
                    defaultMessage: "Admins",
                  })}
                </MenuItem>
              )}
              <MenuItem onClick={handleDeleteChat}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                {path === "" &&
                  intl.formatMessage({
                    id: "delete_chat",
                    defaultMessage: "Delete chat",
                  })}
                {path !== "" &&
                  intl.formatMessage({
                    id: "delete_group_chat",
                    defaultMessage: "Delete group chat",
                  })}
              </MenuItem>
              <MenuItem onClick={handleMarkAsUnread}>
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                {intl.formatMessage({
                  id: "martk_as_unread",
                  defaultMessage: "Mark as unread",
                })}
              </MenuItem>
            </Menu>
            <Typography variant="caption">
              {moment(lastCreated || moment()).format("HH:mm")}
            </Typography>
            <div style={{ height: 5 }}></div>
          </div>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" />
    </div>
  );
};

export default function () {
  const intl = useIntl();
  const navigate = useNavigate();
  const { uid = "" } = useParams();
  const { auth } = useAuth();
  const { watchList, getList, unwatchList } = useLists();
  const { requestPermission } = useMessaging();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const chatsPath = `user_chats/${auth.uid}`;

  useEffect(() => {
    watchList(chatsPath);
    requestPermission();

    return () => unwatchList(chatsPath);
  }, [chatsPath, unwatchList, watchList, requestPermission]);

  const chats = getList(chatsPath).map((c) => {
    return { key: c.key, ...c.val };
  });

  const showChats = matches || !uid;
  const showMessages = matches || uid;

  const currentChat = chats.find((c) => {
    return c.key === uid;
  });

  const path =
    currentChat?.path ||
    (uid ? `user_chat_messages/${auth.uid}/${uid}` : false);
  let title = intl.formatMessage({ id: "chats", defaultMessage: "Chats" });

  if (currentChat) {
    title = currentChat?.displayName;
    /*
    title = (
      <div>
        <Avatar>
          <Avatar src={currentChat?.photoURL}>
            {currentChat?.path !== '' && <Group />}
            {currentChat?.path === '' && <Person />}
          </Avatar>
        </Avatar>
        <Typography>{currentChat?.displayName}</Typography>
      </div>
    )
    */
  }

  return (
    <Page
      onBackClick={
        !matches && uid
          ? () => {
              navigate("/chats", { replace: true });
            }
          : undefined
      }
      pageTitle={title}
    >
      <div style={{ height: "100%", display: "flex" }}>
        {showChats && (
          <div
            style={{
              width: matches ? 300 : "100%",
              height: "100%",
            }}
          >
            <VirtualList
              list={chats}
              name={"user_chats"}
              listProps={{ itemSize: 72 }}
              Row={Row}
            />
            <div style={{ position: "absolute", bottom: 15, right: 15 }}>
              <Fab
                color="secondary"
                onClick={() => {
                  navigate("/create_chat");
                }}
              >
                <ChatIcon />
              </Fab>
            </div>
          </div>
        )}
        {showMessages && (
          <div style={{ flex: 1 }}>
            <Chat path={path} />
          </div>
        )}
      </div>
    </Page>
  );
}
