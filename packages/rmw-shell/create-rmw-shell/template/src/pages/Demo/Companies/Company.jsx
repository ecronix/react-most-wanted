import Form from "../../../components/Forms/Company";
import React from "react";
import { FormPageContainer } from "@ecronix/rmw-shell";
import { useIntl } from "react-intl";
import { useParams, useNavigate } from "react-router-dom";

const path = "companies";
const singular = "company";

export default function CompanyPage() {
  const navigate = useNavigate();
  const intl = useIntl();
  const { uid } = useParams();

  return (
    <FormPageContainer
      path={`${path}`}
      uid={uid}
      getPageProps={(values) => {
        return {
          pageTitle: intl.formatMessage({
            id: path,
            defaultMessage: "Companies",
          }),
        };
      }}
      handleSubmit={(values, newUid) => {
        if (newUid) {
          navigate(`/${path}/${newUid}`, { replace: true });
        } else {
          navigate(`/${path}`);
        }
      }}
      handleDelete={() => {
        navigate(`/${path}`);
      }}
      Form={Form}
      grants={{
        create: `create_${singular}`,
        delete: `delete_${singular}`,
      }}
      deleteDialogProps={{
        title: intl.formatMessage({
          id: `delete_${singular}_dialog_title`,
          defaultMessage: "Delete Company?",
        }),
        message: intl.formatMessage({
          id: `delete_${singular}_dialog_message`,
          defaultMessage: "Company will be deleted permanently?",
        }),
        action: intl.formatMessage({
          id: `delete_${singular}_dialog_action`,
          defaultMessage: "DELETE COMPANY",
        }),
      }}
    />
  );
}
