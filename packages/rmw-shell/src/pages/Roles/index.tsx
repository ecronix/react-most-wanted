import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { ListPage, RowProps } from "@ecronix/material-ui-shell";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";

const fields = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "description",
    label: "Description",
  },
];

const Row: React.FC<RowProps> = ({ data, index, style }) => {
  const { name = "", description = "", key } = data;
  const navigate = useNavigate();

  return (
    <div key={key} style={style}>
      <ListItem
        // TODO - check ListItem doesn't receive button proeprty
        // button
        alignItems="flex-start"
        style={{ height: 72 }}
        onClick={() => {
          navigate(`/roles/${key}/main`);
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <AccountBoxIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={description} />
      </ListItem>
      <Divider variant="inset" />
    </div>
  );
};

export function RolesPage() {
  const intl = useIntl();
  // const navigate = useNavigate();

  return (
    // TODO - check commented fields are not used in ListPage component
    <ListPage
      fields={fields}
      // path="roles"
      // createGrant="create_role"
      name=""
      Row={Row}
      listProps={{ itemSize: 72 }}
      getPageProps={() => {
        return {
          pageTitle: intl.formatMessage({
            id: "roles",
            defaultMessage: "Roles",
          }),
        };
      }}
      // onCreateClick={() => {
      //   navigate("/create_role");
      // }}
    />
  );
}
