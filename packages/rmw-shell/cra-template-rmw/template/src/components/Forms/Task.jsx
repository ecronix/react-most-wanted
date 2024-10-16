import React from "react";
import { Autocomplete, AvatarImage } from "@ecronix/rmw-shell";
import Stack from "@mui/material/Stack";
import { TextField, DatePicker } from "mui-rff";
import { AdapterMoment as DateAdapter } from "@mui/x-date-pickers/AdapterMoment";
import deLocale from "date-fns/locale/de";
import { useIntl } from "react-intl";
import { Box } from "@mui/material";

const uuid = () => {
  const url = URL.createObjectURL(new Blob());
  const [id] = url.toString().split("/").reverse();
  URL.revokeObjectURL(url);
  return id;
};

// eslint-disable-next-line
const Form = ({ id, handleSubmit, values, users = [] }) => {
  const helpers = users.map((u) => {
    const { key, val } = u;
    const { name } = val;

    return { label: name, value: key };
  });

  const intl = useIntl();

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <button type="submit" style={{ display: "none" }} />
      <Stack spacing={3}>
        <Box sx={{ margin: 1 }}>
          <AvatarImage name="photoURL" path={`users/123/${uuid()}.jpeg`} />
        </Box>
        <TextField
          label={intl.formatMessage({ id: "title", defaultMessage: "Title" })}
          name="title"
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth={true}
        />

        <TextField
          label={intl.formatMessage({
            id: "description",
            defaultMessage: "Description",
          })}
          name="description"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          minRows={2}
        />

        <DatePicker
          label={intl.formatMessage({
            id: "due_date",
            defaultMessage: "Due Date",
          })}
          name="due_to"
          inputVariant="outlined"
          margin="normal"
          mask="__.__.____"
          format="DD.MM.YYYY"
          autoOk={true}
          locale={deLocale}
          dateFunsUtils={DateAdapter}
        />

        <Autocomplete
          openOnFocus
          label={intl.formatMessage({
            id: "select_company",
            defaultMessage: "Select Company",
          })}
          name="helper"
          options={helpers}
          getOptionValue={(option) => option}
          getOptionLabel={(option) => option.label || ""}
          getOptionSelected={(o, v) => {
            return o.value === v.value;
          }}
          filterOptions={(options, params) => {
            const filtered = options.filter((v) => {
              return (
                JSON.stringify(v)
                  .toUpperCase()
                  .indexOf(params.inputValue.toUpperCase()) !== -1
              );
            });

            return filtered;
          }}
        />
      </Stack>
    </form>
  );
};

export default Form;
