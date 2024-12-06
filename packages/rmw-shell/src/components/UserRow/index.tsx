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
} from "@ecronix/rmw-shell";
import Badge from "@mui/material/Badge";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Checkbox from "@mui/material/Checkbox";
import { SvgIconProps } from "@mui/material";

const getProviderIcon = (id: string) => {
  const iconProps: SvgIconProps = {
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

type DataType = {
  displayName: string;
  key: string;
  photoURL: string;
  providerData: any[];
  icon: string;
  secondaryText: string;
};

type UserRowProps = {
  data: DataType;
  index: number;
  style: Object;
  admins: any[];
  isChecked?: boolean;
  handleRowClick: (data: DataType) => void;
  hasCheckbox?: boolean;
};
export const UserRow = ({
  data,
  index,
  style,
  admins = [],
  isChecked = false,
  handleRowClick = () => {},
  hasCheckbox = false,
}: UserRowProps) => {
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
        // button
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
