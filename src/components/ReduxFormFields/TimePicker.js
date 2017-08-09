import TimePicker from 'material-ui/TimePicker'
import { Component, createElement } from 'react'
import { mapError } from '../../utils/mapError'

function createComponent(MaterialUIComponent, mapProps) {
  class InputComponent extends Component {
    getRenderedComponent() {
      return this.refs.component
    }

    render() {

      const {input, ...rest} = this.props;
      const {value, ...inputRest} = input;

      let newProps=this.props;

      if(typeof value === 'string' || value instanceof String){

        if(value){
          let newValue=new Date(value);


          newProps={
            input: {
              value: newValue,
              ...inputRest
            },
            ...rest
          }
        }else{
          newProps={
            input: {
              value: null,
              ...inputRest
            },
            ...rest
          }
        }

      }

      return createElement(MaterialUIComponent, {
        ...mapProps(newProps),
        ref: 'component'
      })
    }
  }
  InputComponent.displayName = `ReduxFormMaterialUI${MaterialUIComponent.name}`
  return InputComponent
}


export default createComponent(TimePicker, ({
  input: { onBlur, ...inputProps },
  defaultDate,
  onChange,
  ...props
}) => ({
  format: '24hr',
  ...inputProps,
  ...mapError(props),
  onChange: (event, value) => {
    const newValue=new Date(value).toISOString();
    inputProps.onChange(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }
}))
