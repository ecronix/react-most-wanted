import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { AvatarImageField } from '../ReduxFormFields';
import Toggle from 'material-ui/Toggle';

class UserForm extends Component {

  render() {
    const {
      handleSubmit,
      intl,
      initialized,
      uid,
      handleAdminChange,
      isAdmin
    } = this.props;

    return (
      <form onSubmit={handleSubmit} style={{
        height: '100%',
        alignItems: 'strech',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
      }}>
      <button type="submit" style={{display: 'none'}} />

      <div style={{marginLeft: -10}}>
        <AvatarImageField
          disabled={true}
          uid={uid}
          change={this.props.change}
          initialized={initialized}
          intl={intl}
          path={'users'}
        />

      </div>


      <div>
        <div>
          <Field
            name="displayName"
            disabled={true}
            component={TextField}
            hintText={intl.formatMessage({id: 'name_hint'})}
            floatingLabelText={intl.formatMessage({id: 'name_label'})}
            ref="displayName"
            withRef
          />
        </div>
        <div>
          <Field
            name="email"
            disabled={true}
            component={TextField}
            hintText={intl.formatMessage({id: 'email_hint'})}
            floatingLabelText={intl.formatMessage({id: 'email_label'})}
            ref="email"
            withRef
          />
        </div>

        <br/>

        <div>
          <Toggle
            label={intl.formatMessage({id: 'is_admin_label'})}
            toggled={isAdmin}
            onToggle={handleAdminChange}
          />
        </div>

      </div>
    </form>
  );
}
}


UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleAdminChange: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  initialized: PropTypes.bool.isRequired,
  setDialogIsOpen: PropTypes.any.isRequired,
  uid: PropTypes.string.isRequired,
};


export default reduxForm({form: 'user'})(UserForm);
