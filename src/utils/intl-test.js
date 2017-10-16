/**
* Components using the react-intl module require access to the intl context.
* This is not available when mounting single components in Enzyme.
* These helper functions aim to address that and wrap a valid,
* English-locale intl context around them.
*/

// SOURCE: http://stackoverflow.com/questions/37021217/injecting-react-intl-object-into-mounted-enzyme-components-for-testing

import React from 'react'
import { IntlProvider, intlShape } from 'react-intl'
import { mount, shallow } from 'enzyme'

const messages = require('../locales/en') // en.json
const intlProvider = new IntlProvider({ locale: 'en', messages }, {})
const { intl } = intlProvider.getChildContext()

/**
* When using React-Intl `injectIntl` on components, props.intl is required.
*/
function nodeWithIntlProp (node) {
  return React.cloneElement(node, { intl })
}

export function shallowWithIntl (node) {
  return shallow(nodeWithIntlProp(node), { context: { intl } })
};

export function mountWithIntl (node) {
  return mount(nodeWithIntlProp(node), {
    context: { intl },
    childContextTypes: { intl: intlShape }
  })
};
