import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl } from 'react-intl';
import {Field, reduxForm} from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {SuperSelectField} from '../../containers/SuperSelectField';


class TaskForm extends Component {
  componentDidMount() {
    this.refs.title // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus(); // on TextField
  }

  render() {
    const {handleSubmit, intl, users, initialized} = this.props;

    let userSource=[];

    const usersList=users.list;

    Object.keys(usersList).forEach(function(key,index) {
      const user= usersList[key];

      if(user.uid!==undefined){
        userSource.push({id: user.uid, name: user.displayName});
      }

    });

    return (
      <form onSubmit={handleSubmit} style={{height: '100%', alignItems: 'strech'}}>
        <div>
          <Field
            name="title"
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({id: 'title_hint'})}
            floatingLabelText={intl.formatMessage({id: 'title_label'})}
            ref="title"
            withRef
          />
        </div>

        <div>
          <Field
            name="description"
            component={TextField}
            disabled={!initialized}
            floatingLabelText="Description"
            hintText="Enter description"
            multiLine
            rows={2}
            ref="description"
            withRef
          />
        </div>
        <div>
          <Field
            name='helper'
            //disabled={!initialized}
            component={SuperSelectField}
            //multiple
            hintText='Helper'>
            {userSource.map((val, i) => {
              return (
                <div key={val.id} value={val.id?val.id:i} label={val.name}>
                  {val.name}
                </div>
              )
            })}
          </Field>
        </div>
        <br/>

        <div>
          <RaisedButton
            label={intl.formatMessage({id: 'submit'})}
            type="submit"
            primary={true}
            disabled={!initialized}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { intl, users } = state;

  return {
    intl,
    users
  };
};

TaskForm=reduxForm({form: 'task'})(TaskForm);

export default connect(
  mapStateToProps
)(injectIntl(TaskForm));
