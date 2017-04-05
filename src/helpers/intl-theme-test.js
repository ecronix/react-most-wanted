import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount, shallow } from 'enzyme';

const messages = require('../locales/en'); // en.json
const intlProvider = new IntlProvider({ locale: 'en', messages }, {});
const { intl } = intlProvider.getChildContext();
const muiThemeProvider = new MuiThemeProvider({ muiTheme: getMuiTheme()});
const { muiTheme } = muiThemeProvider.getChildContext();


function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

function nodeWithThemeProp(node) {
  return React.cloneElement(node, { muiTheme });
}


export function shallowWithIntlTheme(node) {
  return shallow(nodeWithThemeProp(nodeWithIntlProp(node)), { context: { intl, muiTheme } });
};

export function mountWithIntlTheme(node) {
  return mount(nodeWithThemeProp(nodeWithIntlProp(node)), {
    context: { intl },
    childContextTypes: { intl: intlShape, muiTheme }
  });
};
