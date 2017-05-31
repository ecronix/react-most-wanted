import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl } from 'react-intl';
import { Activity } from '../../containers/Activity'
import { withRouter } from 'react-router-dom';
import { firebaseDb } from '../../firebase';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

class FireForm extends Component {

  handleSubmit =(values) => {
    const { history , path} = this.props;

    firebaseDb.ref().child(`${path}`).update(values).then(()=>{
      history.goBack()
    })
  }

  handleDelete = () => {
    const { history, path} = this.props;

    firebaseDb.ref().child(`${path}`).remove().then(()=>{
      history.goBack()
    })
  }

  componentDidMount(){
    const {  path} = this.props;

    firebaseDb.ref(`${path}`).once('value').then(
      snapshot => {
        this.setState(snapshot.val())
      }
    )
  }

  render() {
    const { intl, history} = this.props;

    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        onSubmit: this.handleSubmit,
        initialValues: this.state
      })
    );

    return (
      <Activity
        onBackClick={()=>{history.goBack()}}
        iconElementRight={
          <IconButton onTouchTap={this.handleDelete}>
            <FontIcon className="material-icons" >delete</FontIcon>
          </IconButton>
        }
        title={intl.formatMessage({id: 'tasks'})}>
        <div style={{margin: 15}}>
          {childrenWithProps}
        </div>
      </Activity>
    );
  }
}

export default connect(

)(injectIntl(withRouter(FireForm)));
