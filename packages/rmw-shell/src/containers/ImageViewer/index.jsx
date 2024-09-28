import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

export default function ImageViewerContainer({ src, ...rest }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <img src={src} onClick={handleOpen} {...rest} />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        onEscapeKeyDown={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fade in={open}>
          <div
            style={{
              maxHeight: "70%",
              maxWidth: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 50,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999999,
              }}
            >
              <Slide direction="down" in={open} mountOnEnter unmountOnExit>
                <Fab onClick={handleClose} color="secondary" aria-label="close">
                  <CloseIcon />
                </Fab>
              </Slide>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                color="transparent"
                iconContainerStyle={{ border: "none" }}
                animationDuration={0}
                style={{ height: "auto", width: "auto", paddingTop: 0 }}
                imageStyle={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  minHeight: "80%",
                  width: "auto",
                  height: "auto",
                  padding: 0,
                  position: "relative",
                  borderRadius: 5,
                }}
                src={src}
              />
            </div>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
