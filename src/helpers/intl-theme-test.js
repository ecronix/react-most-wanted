import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount, shallow } from 'enzyme';

const messages = require('../locales/en');
const intlProvider = new IntlProvider({ locale: 'en', messages }, {});
const { intl } = intlProvider.getChildContext();
const muiThemeProvider = new MuiThemeProvider({ muiTheme: getMuiTheme()});
const { muiTheme } = muiThemeProvider.getChildContext();


function nodeWithProps(node) {
  return React.cloneElement(node, { intl, muiTheme });
}


export function shallowWithIntlTheme(node, { context } = {}) {
  return shallow(
    nodeWithProps(node),
    {
      context: Object.assign({}, context, {intl, muiTheme}),
    }
  );
};

export function mountWithIntlTheme(node, { context, childContextTypes } = {}) {
  return mount(
    nodeWithProps(node),
    {
      context: Object.assign({}, context, {intl, muiTheme}),
      childContextTypes: Object.assign({}, { intl: intlShape, muiTheme }, childContextTypes)
    }
  );
};
