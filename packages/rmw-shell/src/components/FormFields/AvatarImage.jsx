import React, { useState } from "react";
import { Box, TextField as MuiTextField } from "@mui/material";
import Fab from "@mui/material/Fab";
import Camera from "@mui/icons-material/CameraAlt";
import { showErrorOnChange } from "./Util";
import { Field } from "react-final-form";
import Avatar from "@mui/material/Avatar";
import ImgageUploadDialog from "../../containers/ImageUploadDialog";

export function AvatarImage(props) {
  const [isImageDialogOpen, setImageDialogOpen] = useState(false);
  const { name, type, fieldProps, path, ...rest } = props;

  return (
    <Field
      name={name}
      type={type}
      render={({ input, meta }) => {
        const { value, onChange } = input;
        const handleImageChange = (image) => {
          onChange(image);
        };
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{ minWidth: 100, minHeight: 100 }}
              alt="Picture"
              src={value}
            />
            <Box sx={{ margin: 1 }}>
              <Fab
                onClick={() => setImageDialogOpen(true)}
                style={{}}
                color="primary"
                aria-label="save"
                size="small"
              >
                <Camera />
              </Fab>
            </Box>
            <ImgageUploadDialog
              isOpen={isImageDialogOpen}
              handleClose={() => setImageDialogOpen(false)}
              handleCropSubmit={handleImageChange}
              path={path}
            />
          </div>
        );
      }}
      {...fieldProps}
    />
  );
}
