import SuperSelectField from 'material-ui-superselectfield'
import { Component, createElement } from 'react'

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
      return createElement(MaterialUIComponent, {
        ...mapProps(this.props),
        ref: 'component'
      })
    }
  }
  InputComponent.displayName = `ReduxFormMaterialUI${MaterialUIComponent.name}`
  return InputComponent
}

const mapError = (
  {
    meta: { touched, error, warning } = {},
    input,
    ...props
  },
  errorProp = 'errorText'
) =>
(touched && (error || warning)
? {
  ...props,
  ...input,
  [errorProp]: error || warning
}
: { ...input, ...props })



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
