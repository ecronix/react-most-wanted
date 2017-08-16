import React, { Component } from 'react';
import { TimePicker }  from '../../components/ReduxFormFields';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { formatTimeToObject, formatTimeToString } from '../../utils/dateTime'
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

class TimeField extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  handleTimePickerChange = (e, newVal) => {
    const { change, name, formatOptions } = this.props;

    if (newVal != null) {

      this.setState({
        value: new Date(newVal).toLocaleString('de-DE', formatOptions)
      });
      change(name, new Date(newVal).toISOString());


    }
  }

  handleTimeTextBlur = (state, e) => {

    const { change, input, formatOptions } = this.props;
    const { name } = input;

    const newVal = this.state.value;

    if(!newVal) {
      return;
    }

    this.setState({value: formatTimeToString(newVal, formatOptions)});
    change(name, formatTimeToObject(newVal, formatOptions).toISOString());
  }

  componentWillReceiveProps(nextProps) {
    const { formatOptions } = this.props;

    if (nextProps!==undefined) {
      const { input } = nextProps;
      const { value } = input;

      if(value!==undefined && value!==null && value.length>0){
          this.setState({value: new Date(value).toLocaleString('de-DE', formatOptions)});
      }
    }

  }

  handleTimeTextChange = (evt) => {
    this.setState({value: evt.target.value});
  }


  render() {
    const {
      muiTheme,
      input,
      floatingLabelText,
      timePickerText,
      disabled
    } = this.props;

    const { name }= input;


    return (
      <div style={{display: 'flex', alignItems: 'flex-end'}}>
        <TextField
          name={`${name}Text`}
          value={this.state.value}
          onBlur={this.handleTimeTextBlur}
          onChange={this.handleTimeTextChange}
          disabled={disabled}
          floatingLabelText={floatingLabelText}
          style={{width: 50, alignItems: 'center'}}
          ref={`${name}Text`}
        />
        <Field
          name={name}
          textFieldStyle={{display: 'none'}}
          autoOk={true}
          tabIndex={-1}
          minutesStep={5}
          onChange={this.handleTimePickerChange}
          disabled={disabled}
          component={TimePicker}
          floatingLabelText={''}
          ref={name}
          withRef
        />
        <IconButton
          onClick={()=>{this.refs[name].getRenderedComponent().refs.component.openDialog();}}
          tabIndex={-1}
          disabled={disabled}
          tooltip={timePickerText}>
          <FontIcon
            className="material-icons"
            style={{fontSize: 12}}
            color={muiTheme.palette.primary1Color}>
            access_time
          </FontIcon>
        </IconButton>
      </div>
    );
  }
}


TimeField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  input: PropTypes.object.isRequired,
  floatingLabelText: PropTypes.string.isRequired,
  timePickerText: PropTypes.string.isRequired,
  muiTheme: PropTypes.object.isRequired,
};

export default muiThemeable()(injectIntl(TimeField));
