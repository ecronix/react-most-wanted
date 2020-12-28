import React from 'react'
import { useIntl } from 'react-intl'
import { useSimpleValues } from 'base-shell/lib/providers/SimpleValues'

const HomePage = () => {
  const intl = useIntl()
  const { setValue, getValue, clearAll } = useSimpleValues()

  const simpleNValueKey = 'nkey'
  const simplePValueKey = 'pKey'

  return (
    <div>
      Non persistent: {getValue(simpleNValueKey, 'empty')}
      <br />
      <br />
      Persistent: {getValue(simplePValueKey, 'empty')}
      <br />
      <br />
      <button
        onClick={(e) => {
          setValue(simpleNValueKey, 'non persistent value')
        }}
      >
        SET NON PERSISTENT
      </button>
      <br />
      <br />
      <button
        onClick={(e) => {
          setValue(simplePValueKey, 'persistent value', true)
        }}
      >
        SET PERSISTENT
      </button>
      <br />
      <br />
      <button
        onClick={(e) => {
          //clearValue(simpleNValueKey)
          //clearValue(simplePValueKey)
          //or
          clearAll()
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
