import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl } from 'react-intl';
import {Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {Avatar} from '../../containers/Avatar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { setDialogIsOpen } from '../../store/dialogs/actions';
import { ImageCropDialog } from '../../containers/ImageCropDialog';
import { withRouter } from 'react-router-dom';

class Form extends Component {

  handlePhotoUploadSuccess = (snapshot) =>{
    const { setDialogIsOpen, change}=this.props;
    change('photoURL', snapshot.downloadURL);
    setDialogIsOpen('new_companie_photo', undefined);
  }

  render() {
    const {handleSubmit, intl, initialized, setDialogIsOpen, dialogs, match} = this.props;
    const uid=match.params.uid;

    return (
      <form onSubmit={handleSubmit} style={{
        height: '100%',
        alignItems: 'strech',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>


      <div style={{margin: 15, display: 'flex', flexDirection: 'column'}}>

        <div>
          <Field
            name="photoURL"
            size={120}
            component={Avatar}
            icon={
              <FontIcon
                className="material-icons">
                business
              </FontIcon>
            }
            ref="photoURL"
            withRef
          />
        </div>


        <FlatButton
          onTouchTap={()=>{
            setDialogIsOpen('new_companie_photo', true)
          }}
          disabled={uid===undefined || !initialized}
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

      <div>
        <div>
          <Field
            name="name"
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({id: 'name_hint'})}
            floatingLabelText={intl.formatMessage({id: 'name_label'})}
            ref="name"
            withRef
          />
        </div>

        <div>
          <Field
            name="full_name"
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({id: 'full_name_hint'})}
            floatingLabelText={intl.formatMessage({id: 'full_name_label'})}
            ref="full_name"
            withRef
          />
        </div>


        <div>
          <Field
            name="vat"
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({id: 'vat_hint'})}
            floatingLabelText={intl.formatMessage({id: 'vat_label'})}
            ref="vat"
            withRef
          />
        </div>


        <div>
          <Field
            name="description"
            disabled={!initialized}
            component={TextField}
            multiLine={true}
            rows={2}
            hintText={intl.formatMessage({id: 'description_hint'})}
            floatingLabelText={intl.formatMessage({id: 'description_label'})}
            ref="description"
            withRef
          />
        </div>


        <div>
          <RaisedButton
            label={intl.formatMessage({id: 'submit'})}
            type="submit"
            primary={true}
            disabled={!initialized}
          />
        </div>

        <ImageCropDialog
          path={`companies/${uid}`}
          fileName={`photoURL`}
          onUploadSuccess={(s)=>{this.handlePhotoUploadSuccess(s) }}
          open={dialogs.new_companie_photo!==undefined}
          src={dialogs.new_companie_photo}
          handleClose={()=>{setDialogIsOpen('new_companie_photo',undefined)}}
          title={intl.formatMessage({id: 'change_photo'})}
        />
      </div>

    </form>
  );
}
}


Form=reduxForm({form: 'companie'})(Form);
const selector = formValueSelector('companie')

const mapStateToProps = state => {
  const { intl, vehicleTypes, users, dialogs } = state;

  return {
    intl,
    vehicleTypes,
    users,
    dialogs,
    photoURL: selector(state, 'photoURL')
  };
};

export default connect(
  mapStateToProps, { setDialogIsOpen }
)(injectIntl(withRouter(Form)));
