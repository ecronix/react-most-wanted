import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { TextField, Checkbox } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

class TaskForm extends Component {
  componentDidMount() {
    this.refs.title // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus(); // on TextField
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit} style={{height: '100%'}}>
        <div>
          <Field
            name="title"
            component={TextField}
            hintText="Name"
            floatingLabelText="Name"
            ref="title"
            withRef
          />
        </div>
        <div>
          <Field name="completed" component={Checkbox} label="Done" />
        </div>

        <div>

          <RaisedButton label="Submit" type="submit" primary={true} />

        </div>
      </form>
    );
  }
}

export default connect()(reduxForm({form: 'task'})(TaskForm));
