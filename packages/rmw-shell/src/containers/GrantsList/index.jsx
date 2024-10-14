import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect } from "react";
import { VirtualListContainer, useFilter } from "@ecronix/material-ui-shell";
import { useConfig } from "@ecronix/base-shell";
import { useFirebaseLists } from "@ecronix/rmw-shell";
import { getDatabase, ref, set } from "firebase/database";

export function GrantsListContainer({ grantsPath }) {
  const { appConfig } = useConfig();
  const { auth: authConfig } = appConfig || {};
  const { grants = [] } = authConfig || {};
  const { watchList, getList: getFirebaseList } = useFirebaseLists();
  const { getList } = useFilter();
  const db = getDatabase();

  const roleGrants = getFirebaseList(grantsPath);

  const list = getList(
    "grants",
    grants.map((g) => {
      return { name: g };
    }),
    [{ name: "name" }],
  );

  useEffect(() => {
    watchList(grantsPath);
  }, [grantsPath, watchList]);

  const Row = ({ index, style, data }) => {
    const { name } = data;

    let isSelected = false;

    roleGrants.map((rg) => {
      if (rg.key === name) {
        isSelected = true;
      }

      return rg;
    });

    return (
      <div key={`${name}_${index}`} style={style}>
        <ListItem
          button
          alignItems="flex-start"
          onClick={async () => {
            await set(
              ref(db, `${grantsPath}/${name}`),
              isSelected ? null : true,
            );
          }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isSelected}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText primary={name} secondary={name} />
        </ListItem>
        <Divider />
      </div>
    );
  };

  return (
    <VirtualListContainer
      list={list}
      name="grants"
      listProps={{ itemSize: 72 }}
      Row={Row}
    />
  );
}
