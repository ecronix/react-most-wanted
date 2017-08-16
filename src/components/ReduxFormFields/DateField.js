import React, { Component } from 'react';
import DatePicker  from './DatePicker';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl, intlShape } from 'react-intl';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { formatDateToObject, formatDateToString } from '../../utils/dateTime'
import PropTypes from 'prop-types';

const defaultFormatOptions = {day: '2-digit', month: '2-digit', year: 'numeric'};


class DateField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }


  handleOnDatePickerChange = (e, newVal) => {
    const { change, name, formatOptions } = this.props;

    const format = formatOptions?formatOptions:defaultFormatOptions;

    if(newVal !== null) {
      this.setState({value: new Date(newVal).toLocaleString('de-DE', format)});
      change(name, new Date(newVal).toISOString());
    }
  }


  handleDateTextBlur = (state, e) => {
    const { change, input, formatOptions } = this.props;
    const { name } = input;

    const newVal = this.state.value;
    const format = formatOptions?formatOptions:defaultFormatOptions;

    if(!newVal) {
      return;
    }

    this.setState({value: formatDateToString(newVal, format)});
    change(name, formatDateToObject(newVal, format).toISOString());
  }

  componentWillReceiveProps(nextProps){
    const { formatOptions } = this.props;

    const format = formatOptions?formatOptions:defaultFormatOptions;

    if(nextProps!==undefined){
      const { input } = nextProps;
      const { value } = input;

      if(value!==undefined && value!==null && value.length>0){
        this.setState({value: new Date(value).toLocaleString('de-DE', format)});
      }
    }

  }

  handleDateTextChange = (evt) => {
    this.setState({value: evt.target.value});
  }

  render() {
    const {
      disabled,
      input,
      floatingLabelText,
      datePickerText,
      muiTheme,
      intl,
    } = this.props;

    const { name } = input;

    return (
      <div style={{display: 'flex', alignItems: 'flex-end'}}>

        <TextField
          name={`${name}Text`}
          value={this.state.value}
          onBlur={this.handleDateTextBlur}
          onChange={this.handleDateTextChange}
          disabled={disabled}
          floatingLabelText={floatingLabelText}
          style={{width: 90, alignItems: 'center'}}
          ref={`${name}Text`}
        />
        <Field
          name={name}
          textFieldStyle={{display: 'none'}}
          autoOk={true}
          tabIndex={-1}
          DateTimeFormat={global.Intl.DateTimeFormat}
          okLabel="OK"
          cancelLabel={intl.formatMessage({id: 'cancel'})}
          locale={intl.formatMessage({id: 'current_locale'})}
          disabled={disabled}
          component={DatePicker}
          onChange={this.handleOnDatePickerChange}
          floatingLabelText={''}
          ref={name}
          withRef
        />
        <IconButton
          onClick={()=>{this.refs[name].getRenderedComponent().refs.component.openDialog();}}
          tabIndex={-1}
          disabled={disabled}
          tooltip={datePickerText}>
          <FontIcon
            className="material-icons"
            style={{fontSize: 12}}
            color={muiTheme.palette.primary1Color}>
            event
          </FontIcon>
        </IconButton>
      </div>
    );
  }
}

DateField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  input: PropTypes.object.isRequired,
  floatingLabelText: PropTypes.string.isRequired,
  datePickerText: PropTypes.string.isRequired,
  muiTheme: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default muiThemeable()(injectIntl(DateField));
