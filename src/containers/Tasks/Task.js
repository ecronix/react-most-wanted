import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl } from 'react-intl';
import { GitHubIcon } from '../../components/Icons';
import { Activity } from '../../containers/Activity'
import { reduxForm, formValueSelector} from 'redux-form';
import SimpleForm from './SimpleForm';

class Task extends Component {

  handleSubmit =(prop) => {
    console.log(prop);
  }

  render() {
    const { intl} = this.props;

    return (
      <Activity
        iconElementRight={
          <FlatButton
            href="https://github.com/TarikHuber/react-most-wanted"
            target="_blank"
            rel="noopener"
            secondary={true}
            icon={<GitHubIcon/>}
          />
        }
        title={intl.formatMessage({id: 'tasks'})}>

        <div style={{margin: 15}}>
          <SimpleForm onSubmit={this.handleSubmit} />

        </div>
      </Activity>
    );
  }
}

const mapStateToProps = (state) => {


  const selector = formValueSelector('task');

  return {
    numPizzas: selector(state, 'pizzas'),
    initialValues: {
      delivery: 'delivery',
      name: 'Jane Doe2',
      cheese: 'Cheddar',
      pizzas: 1,
    },
  };
};


Task = reduxForm({  form: 'task'})(Task);

export default connect(
  mapStateToProps,

)(injectIntl(Task));
