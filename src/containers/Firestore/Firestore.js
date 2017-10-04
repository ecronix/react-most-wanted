import React, {Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl, intlShape } from 'react-intl'
import { Activity } from '../../containers/Activity'
import RaisedButton from 'material-ui/RaisedButton'
import { withFirebase } from 'firekit-provider'
import TextField from 'material-ui/TextField'

class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      hotDogStatus: ''
    };
  }

  componentWillMount(){
    const { firebaseApp }= this.props

    let firestore=firebaseApp.firestore()

    const docRef=firestore.doc('samples/sandwichData')

    docRef.onSnapshot(doc=>{
      console.log(doc.data());
      this.setState({...doc.data()})
    })


  }

  handleSave = () => {
    const { firebaseApp }= this.props

    let firestore=firebaseApp.firestore()

    const docRef=firestore.doc('samples/sandwichData')

    docRef.set({
      hotDogStatus: this.state.value
    })
  }

  handleUnwatch = () => {
    const { firebaseApp }= this.props

    let firestore=firebaseApp.firestore()

    const unsub=firestore.doc('samples/sandwichData').onSnapshot(()=>{})

    console.log(firestore.doc('samples/sandwichData'));
    unsub()

  }

  render() {
    const { intl, muiTheme }= this.props

    return (
      <Activity title={intl.formatMessage({id: 'firestore'})}>

        <div style={{padding: 15}}>
          <h1 style={{color: muiTheme.palette.textColor}}>{`${intl.formatMessage({id: 'hot_dog_status'})}: ${this.state.hotDogStatus}`}</h1>
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
            onClick={this.handleUnwatch}
            label="Unwatch"
            primary={true}
            style={{margin: 12, marginLeft:0}}
          />
        </div>

      </Activity>
    );

  }
}

About.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(muiThemeable()(withFirebase(About)));
