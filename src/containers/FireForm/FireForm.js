import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { firebaseDb } from '../../firebase';
import { initialize } from 'redux-form';

class FireForm extends Component {

  constructor(){
    super();
    this.state={
      initialized: false
    }
  }

  clean(obj){
    Object.keys(obj).forEach((key) => (obj[key] === undefined) && delete obj[key]);
    return obj
  }

  getCreateValues = (values) => {
    const { handleCreateValues } = this.props;

    if(handleCreateValues!==undefined && handleCreateValues instanceof Function){
      return handleCreateValues(values);
    }

    return values;

  }

  getUpdateValues = (values) => {
    const { handleUpdateValues } = this.props;

    if(handleUpdateValues!==undefined && handleUpdateValues instanceof Function){
      return handleUpdateValues(values);
    }

    return values;
  }


  handleSubmit =(values) => {
    const { history , path, uid} = this.props;


    console.log(this.getUpdateValues(values));

    if(uid){
      firebaseDb.ref().child(`${path}${uid}`).update(this.getUpdateValues(this.clean(values))).then(()=>{
        history.goBack()
      })
    }else{
      firebaseDb.ref().child(`${path}`).push(this.getCreateValues(this.clean(values))).then(()=>{
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
    const { path, uid, name} = this.props;

    if(uid){
      firebaseDb.ref(`${path}${uid}`).on('value',
      snapshot => {
        this.setState({initialized: true}, ()=>{
          this.props.dispatch(initialize(name, snapshot.val(), true))
        })
      }
    )
  }else{
    this.setState({initialValues: {}, initialized:true})
  }

}

componentWillUnmount(){
  const { path, uid} = this.props;
  firebaseDb.ref(`${path}${uid}`).off()
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
