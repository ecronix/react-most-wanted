import React, {Component} from 'react';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl, intlShape } from 'react-intl'
import { Activity } from '../../containers/Activity'
import RaisedButton from 'material-ui/RaisedButton'
import {withFirebase} from 'firekit-provider';
import TextField from 'material-ui/TextField'

class Firestore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      hotDogStatus: ''
    };
  }

  componentWillMount(){
    this.handleWatch()
  }

  componentWillUnmount(){
    this.handleUnwatch()
  }

  handleSave = () => {
    const { firebaseApp }= this.props

    let firestore=firebaseApp.firestore()

    const docRef=firestore.doc('samples/sandwichData')

    docRef.set({
      hotDogStatus: this.state.value
    })
  }

  handleWatch = () => {
    const { watchDoc }= this.props

    watchDoc('samples/sandwichData')
  }

  handleUnwatch = () => {
    const { unwatchDoc }= this.props

    unwatchDoc('samples/sandwichData')
  }

  handleDestroy = () => {
    const { destroyDoc }= this.props

    destroyDoc('samples/sandwichData')
  }

  render() {
    const { intl, muiTheme, sandwichData, isWatching }= this.props

    return (
      <Activity title={intl.formatMessage({id: 'firestore'})}>

        <div style={{padding: 15}}>
          <h1 style={{color: muiTheme.palette.textColor}}>{`${intl.formatMessage({id: 'hot_dog_status'})}: ${sandwichData.hotDogStatus}`}</h1>
          <TextField
            value={this.state.value}
            onChange={(ev, value)=>{
              this.setState({value})
            }}
            hintText={intl.formatMessage({id: 'hot_dog_status'})}
            ref={(input)=>{if(input){this.input=input}}}
          /><br />
          <RaisedButton
            onClick={this.handleSave}
            label="Save"
            primary={true}
            style={{margin: 12, marginLeft:0}}
          />
          <RaisedButton
            disabled={isWatching}
            onClick={this.handleWatch}
            label="Watch"
            primary={true}
            style={{margin: 12, marginLeft:0}}
          />
          <RaisedButton
            disabled={!isWatching}
            onClick={this.handleUnwatch}
            label="Unwatch"
            primary={true}
            style={{margin: 12, marginLeft:0}}
          />
          <RaisedButton
            onClick={this.handleDestroy}
            label="Destroy"
            primary={true}
            style={{margin: 12, marginLeft:0}}
          />
        </div>

      </Activity>
    );

  }
}

Firestore.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = (state) => {
  const { docs, initialization } = state;

  const sandwichData=docs['samples/sandwichData']?docs['samples/sandwichData']:{}
  const isWatching=initialization['samples/sandwichData']?true:false

  return {
    sandwichData,
    isWatching
  };
};

export default connect(
  mapStateToProps
)(injectIntl(muiThemeable()(withFirebase(Firestore))));
