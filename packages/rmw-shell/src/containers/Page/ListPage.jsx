import Add from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { ListPage } from "@ecronix/material-ui-shell";
import React, { useEffect } from "react";
import { useAuth } from "@ecronix/base-shell";
import { useFirebaseLists } from "@ecronix/rmw-shell";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ListPageContainer({
  fields = [],
  path = "none",
  getRef = false,
  Row,
  listProps = {},
  getPageProps = () => {},
  onCreateClick = () => {},
  createGrant,
  listPageProps,
  reverse = false,
  disableCreate = false,
  fabLabel = null,
}) {
  const { watchList, getList, isListLoading, unwatchList } = useFirebaseLists();
  const { auth } = useAuth();
  const { isAuthGranted = () => false } = auth || {};
  const matches = useMediaQuery("(min-width:400px)");

  useEffect(() => {
    let ref = path;

    if (getRef) {
      ref = getRef();
    }
    watchList(ref, path);
    return () => unwatchList(path);
  }, [getRef, path, watchList, unwatchList]);

  const source = getList(path).map(({ key, val }) => {
    return { key, ...val };
  });

  const list = reverse ? [...source].reverse() : source;

  return (
    <React.Fragment>
      <ListPage
        name={path}
        list={list}
        fields={fields}
        Row={Row}
        listProps={listProps}
        getPageProps={(list) => {
          return {
            isLoading: isListLoading(path),
            ...getPageProps(list),
          };
        }}
        {...listPageProps}
      />
      {isAuthGranted(auth, createGrant) && !disableCreate && (
        <Fab
          variant={matches && fabLabel ? "extended" : undefined}
          color="secondary"
          style={{
            position: "absolute",
            bottom: 18,
            right: 18,
          }}
          onClick={onCreateClick}
        >
          <Add /> {matches ? fabLabel : null}
        </Fab>
      )}
    </React.Fragment>
  );
}
