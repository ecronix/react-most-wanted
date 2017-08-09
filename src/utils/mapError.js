export const mapError = (
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
