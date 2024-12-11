import Form from "../../../components/Forms/Task";
import React, { useEffect } from "react";
import { FormPageContainer } from "@ecronix/rmw-shell";
import { useIntl } from "react-intl";
import { useParams, useNavigate } from "react-router-dom";
import { useFirebaseLists } from "@ecronix/rmw-shell";
import moment from "moment";

const path = "tasks";
const singular = "task";

export default function TaskPage() {
  const navigate = useNavigate();
  const intl = useIntl();
  const { uid } = useParams();
  const { watchList, unwatchList, getList } = useFirebaseLists();

  useEffect(() => {
    watchList("companies");

    return () => unwatchList("companies");
  }, [watchList, unwatchList]);

  const users = getList("companies");

  const initialValues = { helper: "", title: "" };

  return (
    <FormPageContainer
      path={"public_tasks"}
      uid={uid}
      initialValues={initialValues}
      parseValues={(values) => {
        const { due_to } = values;

        console.log("parse values", values);
        return { ...values, due_to: moment(due_to).format() };
      }}
      getPageProps={(_values) => {
        return {
          pageTitle: intl.formatMessage({
            id: path,
            defaultMessage: "Tasks",
          }),
        };
      }}
      handleSubmit={(values, newUid) => {
        console.log("values", values);
        if (newUid) {
          navigate(`/${path}/${newUid}`, { replace: true });
        } else {
          navigate(`/${path}`);
        }
      }}
      handleDelete={() => {
        navigate(`/${path}`);
      }}
      formProps={{ users }}
      Form={Form}
      grants={{
        create: `create_${singular}`,
        delete: `delete_${singular}`,
      }}
      deleteDialogProps={{
        title: intl.formatMessage({
          id: `delete_${singular}_dialog_title`,
          defaultMessage: "Delete Task?",
        }),
        message: intl.formatMessage({
          id: `delete_${singular}_dialog_message`,
          defaultMessage: "Task will be deleted permanently?",
        }),
        action: intl.formatMessage({
          id: `delete_${singular}_dialog_action`,
          defaultMessage: "DELETE TASK",
        }),
      }}
    />
  );
}
