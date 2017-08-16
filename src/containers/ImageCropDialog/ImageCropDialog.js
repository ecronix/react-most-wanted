import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';
import {Cropper} from 'react-image-cropper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { firebaseApp } from '../../firebase';
import firebase from 'firebase';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';

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
    this.state={
      src: undefined,
      isLoading: false,
      isUploading: false,
      uploadProgress: 0
    }
  }

  handlePhotoURLUpload = (photo_url) => {
    const {path, fileName, onUploadSuccess}=this.props;

    this.setState({isUploading: true, uploadProgress: 0});

    let uploadTask=firebaseApp.storage().ref(`${path}/${fileName}`).putString(photo_url, 'data_url');


    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot =>{
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({isUploading: true, uploadProgress: progress})
    }, error => {
      console.log(error);
    }, () => {
      this.setState({isUploading: false, uploadProgress: 100}, ()=>{
        onUploadSuccess(uploadTask.snapshot);
      })

    })


  }

  hanldePhotoULRChange = (e) => {
    e.preventDefault();

    this.setState({isLoading: true});

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({src: reader.result, isLoading: false, file: files[0]})
    };
    reader.readAsDataURL(files[0]);
  }

  handleClose = () => {
    const { handleClose } =this.props;
    this.setState({src: undefined});
    handleClose();
  }

  render(){
    const {intl, open, title } =this.props;

    const actions = [
      <FlatButton
        disabled={!this.state.src || this.state.isLoading || this.state.isUploading}
        label={intl.formatMessage({id: 'submit'})}
        primary={true}
        onClick={()=>{this.handlePhotoURLUpload(this.cropper.crop())}}
      />,
      <FlatButton
        label={intl.formatMessage({id: 'cancel'})}
        secondary={true}
        onClick={this.handleClose}
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

            {(!this.state.src || this.state.isLoading) &&
              <input
                ref={(field) => {
                  if(field!==null){
                    field.click()
                  }
                }}
                type="file"
                accept="image/*"
                //style={{visibility:'hidden'}}
                onChange={this.hanldePhotoULRChange}
              />
            }

            {this.state.isLoading &&
              <CircularProgress size={80} thickness={5} />
            }

            {this.state.isUploading &&
              <LinearProgress mode="determinate" value={this.state.uploadProgress} />
            }

            {this.state.src &&
              <Cropper
                ref={(field) => { this.cropper = field; }}
                src={this.state?this.state.src:undefined}
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
  path: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth
  };
};

export default connect(
  mapStateToProps
)(injectIntl(ImageCropDialog));
