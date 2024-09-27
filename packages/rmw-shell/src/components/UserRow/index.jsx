import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Mail from "@mui/icons-material/Mail";
import Star from "@mui/icons-material/Star";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {
  GoogleIcon,
  FacebookIcon,
  GitHubIcon,
  TwitterIcon,
} from "../../components/Icons";
import Badge from "@mui/material/Badge";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Checkbox from "@mui/material/Checkbox";

const getProviderIcon = (id) => {
  const iconProps = {
    color: "primary",
    style: {
      height: 20,
      width: 20,
    },
  };

  if (id === "google.com") {
    return <GoogleIcon key={id} {...iconProps} />;
  }
  if (id === "facebook.com") {
    return <FacebookIcon key={id} {...iconProps} />;
  }
  if (id === "github.com") {
    return <GitHubIcon key={id} {...iconProps} />;
  }
  if (id === "twitter.com") {
    return <TwitterIcon key={id} {...iconProps} />;
  }

  return <Mail key={id} {...iconProps} />;
};

const Row = ({
  data,
  index,
  style,
  admins = [],
  isChecked = false,
  handleRowClick = () => {},
  hasCheckbox = false,
}) => {
  const {
    displayName = "",
    key,
    photoURL,
    providerData = [],
    icon,
    secondaryText,
  } = data;

  let isAdmin = false;

  admins.map((a) => {
    if (a.key === key) {
      isAdmin = true;
    }
    return a;
  });

  return (
    <div key={key} style={style}>
      <ListItem
        button
        alignItems="flex-start"
        style={{ height: 82 }}
        onClick={() => handleRowClick(data)}
      >
        <ListItemAvatar>
          <Badge
            invisible={!isAdmin}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            badgeContent={
              <Star
                style={{
                  width: 15,
                  padding: 0,
                }}
              />
            }
            color="secondary"
          >
            <Avatar src={photoURL} style={{ height: 45, width: 45 }}>
              {icon}
            </Avatar>
          </Badge>
        </ListItemAvatar>

        <ListItemText
          primary={`${displayName}`}
          secondary={
            providerData.length > 0 ? (
              <React.Fragment>
                {providerData.map((p) => {
                  return getProviderIcon(p.providerId);
                })}
              </React.Fragment>
            ) : (
              secondaryText
            )
          }
        />
        {hasCheckbox && (
          <ListItemSecondaryAction>
            <Checkbox
              edge="end"
              checked={!!isChecked}
              onClick={() => handleRowClick(data)}
            />
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <Divider variant="inset" />
    </div>
  );
};

export default Row;
