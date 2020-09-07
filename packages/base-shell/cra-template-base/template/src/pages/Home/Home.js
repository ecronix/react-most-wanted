import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { useSimpleValues } from 'base-shell/lib/providers/SimpleValues'

const HomePage = () => {
  const intl = useIntl()
  const { setValue, getValue } = useSimpleValues()

  console.log(getValue('test', 0))

  return (
    <div>
      <button
        onClick={(e) => {
          setValue('test', 3, true)
        }}
      >
        OK
      </button>

      {intl.formatMessage({ id: 'home' })}
    </div>
  )
}
export default HomePage
