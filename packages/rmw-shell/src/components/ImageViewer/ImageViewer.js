import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Image from 'material-ui-image'
import Modal from '@material-ui/core/Modal'
import React, { useState } from 'react'
import Fab from '@material-ui/core/Fab'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

const ImageViewer = ({ src, ...rest }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Image src={src} onClick={handleOpen} {...rest} />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        onEscapeKeyDown={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Fade in={open}>
          <div
            style={{
              maxHeight: '70%',
              maxWidth: '90%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'cemnter'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 50,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Slide direction="down" in={open} mountOnEnter unmountOnExit>
                <Fab onClick={handleClose} color="secondary" aria-label="close">
                  <CloseIcon />
                </Fab>
              </Slide>
            </div>
            <Image
              animationDuration={0}
              style={{ height: 'auto', width: 'auto', paddingTop: 0 }}
              imageStyle={{
                maxWidth: '100%',
                maxHeight: '100%',
                minHeight: '80%',
                width: 'auto',
                height: 'auto',
                padding: 0,
                position: 'relative',
                borderRadius: 5
              }}
              src={src}
            />
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}

export default ImageViewer
