import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';
import {updateUserPhoto, setNewPhotoURL} from '../../store/auth/actions';
import {Cropper} from 'react-image-cropper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

const styles={
  container: {
    display: 'flex',
    alignItems:'strech',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dialog: {
    width: '100%',
    maxWidth: 'none'
  },
  cropper: {
    height: 250,
    width: 250
  }
}

export class ImageCropDialog extends Component {

  constructor(props) {
    super(props);
    this.cropper = null;
  }

  handleClose = () => {
    const {setNewPhotoURL} = this.props;
    setNewPhotoURL(null);
  }

  hanleUpdatePhotoSubmit = () => {
    const { auth, updateUserPhoto} =this.props;
    updateUserPhoto(this.cropper.crop(), auth.uid);
  }

  render(){
    const {intl, auth, open, title } =this.props;

    const actions = [
      <FlatButton
        label={intl.formatMessage({id: 'submit'})}
        primary={true}
        onTouchTap={this.hanleUpdatePhotoSubmit}
      />,
      <FlatButton
        label={intl.formatMessage({id: 'cancel'})}
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (

      <Dialog
        contentStyle={styles.dialog}
        title={title}
        actions={actions}
        onRequestClose={this.handleClose}
        open={open}>
        <div style={styles.container}>
          <div style={styles.cropper}>
            {auth.isFetching &&
              <CircularProgress size={80} thickness={5} />
            }
            {!auth.isFetching &&
              <Cropper
                ref={(field) => { this.cropper = field; }}
                src={auth.newPhotoURL}
                aspectRatio={9 / 9}
              />
            }
          </div>

        </div>

      </Dialog>
    );

  }

}

ImageCropDialog.propTypes = {
  intl: intlShape.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  updateUserPhoto: PropTypes.func.isRequired,
  setNewPhotoURL: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth
  };
};

export default connect(
  mapStateToProps,
  {
    updateUserPhoto, setNewPhotoURL
  }
)(injectIntl(ImageCropDialog));
