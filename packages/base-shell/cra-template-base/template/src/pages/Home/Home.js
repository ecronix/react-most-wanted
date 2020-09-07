import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { useSimpleValues } from 'base-shell/lib/providers/SimpleValues'

const HomePage = () => {
  const intl = useIntl()
  const { setValue, getValue, clearValue } = useSimpleValues()

  console.log(getValue('test', 0))

  return (
    <div>
      <button
        onClick={(e) => {
          setValue('test', 3, true)
        }}
      >
        SET
      </button>
      <br />
      <br />
      <button
        onClick={(e) => {
          clearValue('test')
        }}
      >
        CLEAR
      </button>
      <br />
      {intl.formatMessage({ id: 'home' })}
      <br />
    </div>
  )
}
export default HomePage
