import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';
import {Cropper} from 'react-image-cropper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
    }
  }

  hanldePhotoULRChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({src: reader.result})
    };
    reader.readAsDataURL(files[0]);
  }

  handleClose = () => {
    const { handleClose } =this.props;
    this.setState({src: undefined});
    handleClose();
  }

  render(){
    const {intl, open, title, onSubmit } =this.props;

    const actions = [
      <FlatButton
        label={intl.formatMessage({id: 'submit'})}
        primary={true}
        onTouchTap={()=>{onSubmit(this.cropper.crop())}}
      />,
      <FlatButton
        label={intl.formatMessage({id: 'cancel'})}
        secondary={true}
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

            {!this.state.src &&
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
  onSubmit: PropTypes.func.isRequired,
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
