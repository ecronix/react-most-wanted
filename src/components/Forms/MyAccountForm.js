import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import FontIcon from 'material-ui/FontIcon'
import { ImageCropDialog } from '../../containers/ImageCropDialog'
import IconButton from 'material-ui/IconButton'
import config from '../../config'
import { AvatarImageField } from '../ReduxFormFields'


class MyAccountForm extends Component {

  render() {
    const {
      handleSubmit,
      intl,
      initialized,
      setSimpleValue,
      new_company_photo,
      auth,
      muiTheme,
      isLinkedWithProvider,
      linkUserWithPopup,
      getProviderIcon,
      handleEmailVerificationsSend,
      handlePhotoUploadSuccess,
    } = this.props

    const uid = auth.uid
    const showPasswords = isLinkedWithProvider('password')

    return (
      <form onSubmit={handleSubmit} style={{
        height: '100%',
        alignItems: 'strech',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>

      <div style={{margin: 15, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <AvatarImageField
          uid={uid}
          change={this.props.change}
          initialized={initialized}
          intl={intl}
          path={'users'}/>

          <div>
            {
              config.firebase_providers.map((p, i)=>{
                if(p.PROVIDER_ID!=='email' && p.PROVIDER_ID!=='password' && p.PROVIDER_ID!=='phone'){
                  return <IconButton
                    key={i}
                    disabled={isLinkedWithProvider(p)}
                    onClick={()=>{linkUserWithPopup(p)}}
                    tooltip={intl.formatMessage({id: `link_with_${p.PROVIDER_ID}`})}>
                    {getProviderIcon(p)}
                  </IconButton>
                }else{
                  return <div key={i}></div>
                }
              })
            }
          </div>
        </div>

        <div>
          <div>
            <Field
              name="displayName"
              disabled={!initialized}
              component={TextField}
              fullWidth={true}
              hintText={intl.formatMessage({id: 'name_hint'})}
              floatingLabelText={intl.formatMessage({id: 'name_label'})}
              ref="displayName"
              withRef
            />
          </div>

          <div style={{display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap'}}>
            <div>
              <Field
                name="email"
                disabled={!initialized}
                component={TextField}
                hintText={intl.formatMessage({id: 'email'})}
                floatingLabelText={intl.formatMessage({id: 'email'})}
                ref="email"
                withRef
              />
            </div>

            <div>
              <IconButton
                onClick={auth.emailVerified===true?undefined:handleEmailVerificationsSend}
                tooltip={intl.formatMessage({id: auth.emailVerified===true?'email_verified':'email_not_verified'})}>
                <FontIcon
                  color={auth.emailVerified===true?muiTheme.palette.primary1Color:muiTheme.palette.accent1Color}
                  style={{'paddingLeft': 10}}
                  className="material-icons">
                  {auth.emailVerified===true?'verified_user':'error'}
                </FontIcon>
              </IconButton>
            </div>
          </div>

          {
            showPasswords &&
            <div>
              <div>
                <Field
                  name="old_password"
                  disabled={!initialized}
                  type="Password"
                  component={TextField}
                  fullWidth={true}
                  hintText={intl.formatMessage({id: 'password'})}
                  floatingLabelText={intl.formatMessage({id: 'password'})}
                  ref="old_password"
                  withRef
                />
              </div>

              <div>
                <Field
                  name="new_password"
                  disabled={!initialized}
                  type="Password"
                  component={TextField}
                  fullWidth={true}
                  hintText={intl.formatMessage({id: 'password'})}
                  floatingLabelText={intl.formatMessage({id: 'password'})}
                  ref="new_password"
                  withRef
                />
              </div>

              <div>
                <Field
                  name="new_password_confirmation"
                  disabled={!initialized}
                  type="Password"
                  component={TextField}
                  fullWidth={true}
                  hintText={intl.formatMessage({id: 'confirm_password'})}
                  floatingLabelText={intl.formatMessage({id: 'confirm_password'})}
                  ref="new_password_confirmation"
                  withRef
                />
              </div>
            </div>
          }
        </div>

        <ImageCropDialog
          path={`users/${uid}`}
          fileName={`photoURL`}
          onUploadSuccess={(s)=>{handlePhotoUploadSuccess(s) }}
          open={new_company_photo!==undefined}
          src={new_company_photo}
          handleClose={()=>{setSimpleValue('new_company_photo',undefined)}}
          title={intl.formatMessage({id: 'change_photo'})}
        />
      </form>
    );
  }
}

MyAccountForm.propTypes = {
  getProviderIcon: PropTypes.func.isRequired,
  handleEmailVerificationsSend: PropTypes.func.isRequired,
  handlePhotoUploadSuccess: PropTypes.func.isRequired,
  handleUserDeletion: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialized: PropTypes.bool.isRequired,
  setSimpleValue: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  isLinkedWithProvider: PropTypes.func.isRequired,
  linkUserWithPopup: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  auth: PropTypes.object.isRequired,
};

export default reduxForm({form: 'my_account'})(MyAccountForm)
