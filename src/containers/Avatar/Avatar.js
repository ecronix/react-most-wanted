import Avatar from 'material-ui/Avatar'
import { Component, createElement } from 'react'

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


export default createComponent(Avatar, ({
  input,
  meta,
  ...props
}) => ({
  ...props,
  src: input ? input.value: undefined,
  ...mapError(props),
}))
