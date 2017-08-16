import React, { Component } from 'react';
import { Field } from 'redux-form';
import FontIcon from 'material-ui/FontIcon';
import { Avatar } from '../../containers/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { ImageCropDialog } from '../../containers/ImageCropDialog';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';


export default class AvatarImageField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected_avatar_image: undefined
    }
  }

  handlePhotoUploadSuccess = (snapshot) =>{
    const { change } = this.props;

    change('photoURL', snapshot.downloadURL);
    this.state = this.setState({selected_avatar_image: undefined})
  }


  render() {
    const {
      disabled,
      initialized,
      uid,
      intl,
      altIconName,
      path
    } = this.props;

    return (
      <div style={{margin: 20}}>
        <div>
          <Field
            name="photoURL"
            size={120}
            component={Avatar}
            icon={
              <FontIcon
                className="material-icons">
                {altIconName}
              </FontIcon>
            }
            ref="photoURL"
            withRef
          />
        </div>
        <div>
          <FlatButton
            style={{width: '100%'}}
            onClick={()=>{
              this.state = this.setState({selected_avatar_image: 'true'})
            }}
            disabled={disabled===true?true:(uid===undefined || !initialized)}
            containerElement='label'
            primary={true}
            icon={
              <FontIcon
                className="material-icons">
                photo_camera
              </FontIcon>
            }
          />
      </div>

        <ImageCropDialog
          path={`${path}/${uid}`}
          fileName={`photoURL`}
          onUploadSuccess={(s)=>{this.handlePhotoUploadSuccess(s)}}
          open={this.state.selected_avatar_image!==undefined}
          src={this.state.selected_avatar_image}
          handleClose={()=>{this.setState({'selected_avatar_image': undefined})}}
          title={intl.formatMessage({id: 'change_photo'})}
        />

      </div>
    );
  }
}

AvatarImageField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  initialized: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  altIconName: PropTypes.string,
  path: PropTypes.string.isRequired
};
