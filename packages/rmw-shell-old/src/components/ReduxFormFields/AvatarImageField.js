import Avatar from '../../components/ReduxFormFields/Avatar'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Field } from 'redux-form'
import { ImageCropDialog } from '../../containers/ImageCropDialog'

const AvatarImageField = ({ icon, disabled, initialized, intl, path, uid, name, change, cropperProps }) => {
  const [selectedImage, setImage] = useState(undefined)

  const handlePhotoUploadSuccess = snapshot => {
    snapshot.ref.getDownloadURL().then(downloadURL => {
      change(name, downloadURL)
      setImage(undefined)
    })
  }

  return (
    <div style={{ margin: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <Field
          name={name}
          style={{ width: 120, height: 120, fontSize: 60 }}
          component={Avatar}
          icon={icon ? icon : <PhotoCamera fontSize="large" />}
        />
      </div>
      <div>
        <IconButton
          style={{ width: '100%' }}
          onClick={() => {
            setImage('true')
          }}
          disabled={disabled === true ? true : uid === undefined || !initialized}
          color="primary"
        >
          <PhotoCamera />
        </IconButton>
      </div>

      <ImageCropDialog
        path={`${path}/${uid}`}
        fileName={name}
        onUploadSuccess={s => {
          handlePhotoUploadSuccess(s)
        }}
        open={selectedImage !== undefined}
        src={selectedImage}
        handleClose={() => {
          setImage(undefined)
        }}
        title={intl.formatMessage({ id: 'change_photo' })}
        cropperProps={cropperProps}
      />
    </div>
  )
}

AvatarImageField.propTypes = {
  uid: PropTypes.string.isRequired,
  altIconName: PropTypes.string,
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default AvatarImageField
