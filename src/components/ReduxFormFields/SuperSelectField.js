import SuperSelectField from 'material-ui-superselectfield'
import { Component, createElement } from 'react'
import { mapError } from '../../utils/mapError'

/**
* Creates a component class that renders the given Material UI component
*
* @param MaterialUIComponent The material ui component to render
* @param mapProps A mapping of props provided by redux-form to the props the Material UI
* component needs
*/
function createComponent(MaterialUIComponent, mapProps) {
  class InputComponent extends Component {
    getRenderedComponent() {
      return this.refs.component
    }

    render() {

      const {input,  ...rest } = this.props;
      const {value, ...inputRest} = input;

      let newProps=this.props;

      if(typeof value === 'string' || value instanceof String){

        newProps={
          input: {
            value: undefined,
            ...inputRest
          },
          ...rest
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

export default createComponent(
  SuperSelectField,
  ({ input: { onChange,value, onBlur, ...inputProps }, onChange:onChangeFromField, ...props }) => ({
    ...mapError(props),
    ...inputProps,
    value: value,
    onChange: (selectedValues, name) => {
      onChange(selectedValues)
      if(onChangeFromField) {
        onChangeFromField(selectedValues)
      }
    },
    onBlur: () => onBlur(value)
  }))
