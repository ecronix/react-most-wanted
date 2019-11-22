import AvatarImageField from 'rmw-shell/lib/components/ReduxFormFields/AvatarImageField'
import Business from '@material-ui/icons/Business'
import MenuItem from '@material-ui/core/MenuItem'
import renderSelectField from '../Select'
import React, { Component } from 'react'
import TextField from 'rmw-shell/lib/components/ReduxFormFields/TextField'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { ImageCropDialog } from 'rmw-shell/lib/containers/ImageCropDialog'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'

class Form extends Component {
  render() {
    const {
      handleSubmit,
      intl,
      initialized,
      setDialogIsOpen,
      dialogs,
      match,
      change,
    } = this.props

    const uid = match.params.uid

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'strech',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button type="submit" style={{ display: 'none' }} />

        <div style={{ margin: 15, display: 'flex', flexDirection: 'column' }}>
          <AvatarImageField
            name="photoURL"
            disabled={!initialized}
            uid={uid}
            change={change}
            initialized={initialized}
            icon={<Business fontSize="large" />}
            intl={intl}
            path={'companies'}
          />

          <div>
            <Field
              name="name"
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'name_hint' })}
              label={intl.formatMessage({ id: 'name_label' })}
            />
          </div>
          <div>
         <Field
          id="color"
          disabled={!initialized}
          label={intl.formatMessage({ id: 'color_label' })}
          name="color"
          component={renderSelectField}>
           <MenuItem value={'amber'}> {intl.formatMessage({ id: 'amber_label' })} </MenuItem>
           <MenuItem value={'black'}> {intl.formatMessage({ id: 'black_label' })} </MenuItem>
           <MenuItem value={'blue'}> {intl.formatMessage({ id: 'blue_label' })} </MenuItem>
           <MenuItem value={'gray'}> {intl.formatMessage({ id: 'gray_label' })} </MenuItem>
          <MenuItem value={'green'}> {intl.formatMessage({ id: 'green_label' })} </MenuItem>
          </Field>
         </div>
         <div>
         <Field
          id="dress"
          label={intl.formatMessage({ id: 'dress_label' })}
          name="dress"
          component={renderSelectField}>
        <MenuItem value={'XS'}> XS </MenuItem>
        <MenuItem value={'S'}> S </MenuItem>
        <MenuItem value={'S/M'}> S/M </MenuItem>
        <MenuItem value={'M'}> M </MenuItem>
        <MenuItem value={'M/L'}> M/L </MenuItem>
        <MenuItem value={'L'}> L </MenuItem>
        <MenuItem value={'XL'}> XL </MenuItem>
        <MenuItem value={'XXL'}> XXL </MenuItem>
        </Field>
         </div>
          <div>
            <Field
              name="full_name"
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'full_name_hint' })}
              label={intl.formatMessage({ id: 'full_name_label' })}
            />
          </div>

          <div>
            <Field
              name="vat"
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'vat_hint' })}
              label={intl.formatMessage({ id: 'vat_label' })}
            />
          </div>

          <div>
            <Field
              name="workers"
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'workers_hint' })}
              label={intl.formatMessage({ id: 'workers_label' })}
              type="number"
            />
          </div>

          <div>
            <Field
              name="worth"
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'worth_hint' })}
              label={intl.formatMessage({ id: 'worth_label' })}
            />
          </div>

          <div>
            <Field
              name="description"
              disabled={!initialized}
              component={TextField}
              multiline
              rows={2}
              placeholder={intl.formatMessage({ id: 'description_hint' })}
              label={intl.formatMessage({ id: 'description_label' })}
            />
          </div>

          <ImageCropDialog
            path={`companies/${uid}`}
            fileName={'photoURL'}
            onUploadSuccess={s => {
              this.handlePhotoUploadSuccess(s)
            }}
            open={dialogs.new_company_photo !== undefined}
            src={dialogs.new_company_photo}
            handleClose={() => {
              setDialogIsOpen('new_company_photo', undefined)
            }}
            title={intl.formatMessage({ id: 'change_photo' })}
          />
        </div>
      </form>
    )
  }
}

Form = reduxForm({ form: 'company' })(Form)
const selector = formValueSelector('company')

const mapStateToProps = state => {
  const { intl, vehicleTypes, users, dialogs } = state

  return {
    intl,
    vehicleTypes,
    users,
    dialogs,
    photoURL: selector(state, 'photoURL'),
  }
}

export default connect(mapStateToProps, { setDialogIsOpen })(
  injectIntl(withRouter(withTheme(Form)))
)
