import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { firebaseDb } from '../../firebase';

class FireForm extends Component {

  getCreateValues= (values) => {
    const { handleCreateValues } = this.props;

    if(handleCreateValues!==undefined && handleCreateValues instanceof Function){
      return handleCreateValues(values);
    }

    return values;

  }

  getUpdateValues= (values) => {
    const { handleUpdateValues } = this.props;

    if(handleUpdateValues!==undefined && handleUpdateValues instanceof Function){
      return handleUpdateValues(values);
    }

    return values;

  }


  handleSubmit =(values) => {
    const { history , path, uid} = this.props;

    console.log(values);

    if(uid){
      firebaseDb.ref().child(`${path}${uid}`).update(this.getUpdateValues(values)).then(()=>{
        history.goBack()
      })
    }else{
      firebaseDb.ref().child(`${path}`).push(this.getCreateValues(values)).then(()=>{
        history.goBack()
      })
    }

  }

  handleDelete = () => {
    const { history, path, uid} = this.props;

    if(uid){
      firebaseDb.ref().child(`${path}${uid}`).remove().then(()=>{
        history.goBack()
      })
    }

  }

  componentDidMount(){
    const { path, uid, initialValues} = this.props;

    if(uid){
      this.setState({initialized:false})
      firebaseDb.ref(`${path}${uid}`).once('value').then(
        snapshot => {
          this.setState({initialValues:snapshot.val(), initialized: true})
        }
      )
    }else{
      this.setState({initialValues:initialValues?initialValues:{}, initialized:true})
    }

  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        onSubmit: this.handleSubmit,
        ...this.state,
        ...this.props
      })
    );

    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}

export default connect()(withRouter(FireForm));
