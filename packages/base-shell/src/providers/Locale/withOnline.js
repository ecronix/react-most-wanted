import Context from './Context'
import React from 'react'

const withLocale = (Component) => {
  const ChildComponent = (props) => {
    return (
      <Context.Consumer>
        {({ locale, setLocale }) => {
          return <Component locale={locale} setLocale={setLocale} {...props} />
        }}
      </Context.Consumer>
    )
  }

  return ChildComponent
}

export default withLocale
