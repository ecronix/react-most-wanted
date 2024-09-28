import { Done, DoneAll, KeyboardArrowDown } from "@mui/icons-material";
import {
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAuth, useConfig } from "@ecronix/base-shell";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { ImageViewerContainer } from "@ecronix/rmw-shell";
import Linkify from "react-linkify";
import { getDatabase, ref, update, set } from "firebase/database";

const getMapLoc = (loc) => {
  let lat = 0;
  let lng = 0;

  if (loc) {
    const data = loc.split("@") ? loc.split("@")[1] : false;
    if (data) {
      lat = data.split(",")[0];
      lng = data.split(",")[1];
    }
  }

  return { lat, lng };
};

export function ChatMessage({
  message: data,
  path,
  uid,
  userChanged = false,
  dateChanged = false,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { auth } = useAuth();
  const { appConfig } = useConfig();
  const {
    authorUid,
    authorPhotoUrl = null,
    authorName = "",
    message = "",
    type,
    location = "",
    image,
    isSend,
    isReceived,
    isRead,
    scrollToBottom,
    created = "",
  } = data?.val || {};
  const intl = useIntl();
  const isMe = auth.uid === authorUid;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const open = Boolean(anchorEl);
  const db = getDatabase();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const days = moment(created).diff(moment(), "days");

  useEffect(() => {
    if (authorUid && auth.uid !== authorUid && !isRead) {
      const db = getDatabase();
      const updates = {};
      updates[`${path}/${uid}`] = true;
      updates[`user_chats/${auth.uid}/${authorUid}/unread`] = null;

      update(ref(db), updates);
    }
  }, [path, uid, authorUid, auth, isRead]);

  const backgroundColor = isMe
    ? theme.palette.grey[500]
    : theme.palette.grey[300];

  return (
    <React.Fragment>
      {dateChanged && (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <div>
            <Chip
              size="small"
              style={{
                fontSize: 10,
                color: "grey",
                backgroundColor: theme.palette.grey[200],
              }}
              label={`${
                created
                  ? intl.formatRelativeTime(days, "day", { numeric: "auto" })
                  : undefined
              }`}
            />
          </div>
        </div>
      )}

      <Paper
        elevation={1}
        onClick={() => {
          setShowMenu(showMenu);
        }}
        onMouseEnter={() => {
          setShowMenu(true);
        }}
        onMouseLeave={() => {
          setShowMenu(false);
        }}
        onDoubleClick={() => {
          console.log("test");
        }}
        style={{
          marginTop: userChanged ? 6 : 2,
          padding: 0,
          maxWidth: 320,
          alignSelf: isMe ? "flex-end" : "flex-start",
          borderRadius: userChanged
            ? isMe
              ? "6px 0px 6px 6px"
              : "0px 6px 6px 6px"
            : "6px 6px 6px 6px",
          backgroundColor,
          color: isMe ? "white" : "black",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
        }}
      >
        {showMenu && (authorUid === auth.uid || auth.isAdmin) && (
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ flex: 1 }}></div>
            <div>
              <IconButton
                style={{ margin: 0, padding: 0 }}
                size="small"
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <KeyboardArrowDown />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  key={"delete"}
                  onClick={async () => {
                    handleClose();
                    await set(ref(db), `${path}/${uid}`, null);
                  }}
                >
                  {intl.formatMessage({
                    id: "delete",
                    defaultMessage: "Delete",
                  })}
                </MenuItem>
              </Menu>
            </div>
          </div>
        )}
        {!isMe && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              paddingRight: 4,
              paddingLeft: 4,
              cursor: "pointer",
            }}
            onClick={async () => {
              await update(ref(db, `user_chats/${auth.uid}/${authorUid}`), {
                displayName: authorName,
                photoURL: authorPhotoUrl,
              });

              navigate(`/chats/${authorUid}`);
            }}
          >
            <Typography
              variant="caption"
              color="secondary"
              style={{
                fontSize: 10,
                padding: 0,
                margin: 0,
              }}
            >
              {authorName}
            </Typography>
          </div>
        )}
        <div style={{ padding: 4, paddingBottom: 0 }}>
          {type === "text" && (
            <Linkify
              properties={{
                target: "_blank",
              }}
            >
              <Typography variant="body2">{message}</Typography>
            </Linkify>
          )}
          {type === "image" && (
            <div>
              <ImageViewerContainer
                style={{
                  height: "auto",
                  maxWidth: 300,
                  paddingTop: 0,
                  cursor: "pointer",
                  borderRadius: 5,
                }}
                imageStyle={{
                  maxWidth: "100%",
                  padding: 0,
                  position: "relative",
                  borderRadius: 5,
                }}
                onLoad={scrollToBottom}
                src={image}
                color={backgroundColor}
                alt="chat_image"
              />
            </div>
          )}
          {type === "location" && (
            <img
              alt="location"
              onClick={() => {
                window.open(location, "blank");
              }}
              style={{
                height: "auto",
                maxWidth: 300,
                paddingTop: 0,
                cursor: "pointer",
                borderRadius: 5,
              }}
              src={`https://maps.googleapis.com/maps/api/staticmap?center=%7C${
                location.lat
              },${getMapLoc(location).lng}&zoom=14&size=300x300
&markers=color:red%7Clabel:%7C${getMapLoc(location).lat},${
                getMapLoc(location).lng
              }
&key=${appConfig.googleMaps.apiKey}`}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            paddingRight: 4,
            paddingLeft: 4,
          }}
        >
          <Typography
            variant="caption"
            style={{
              fontSize: 8,
              padding: 0,
              margin: 0,
              color: "black",
            }}
          >
            {created ? intl.formatTime(new Date(created)) : undefined}
          </Typography>
          {isSend && isReceived && (
            <DoneAll
              style={{
                fontSize: 11,
                padding: 0,
                paddingLeft: 2,
                bottom: -2,
                color: isRead
                  ? theme.palette.secondary.main
                  : theme.palette.text.primary,
              }}
            />
          )}
          {isSend && !isReceived && (
            <Done
              style={{
                fontSize: 11,
                padding: 0,
                paddingLeft: 2,
                bottom: -2,
                color: isRead
                  ? theme.palette.secondary.main
                  : theme.palette.text.primary,
              }}
            />
          )}
        </div>
      </Paper>
    </React.Fragment>
  );
}
