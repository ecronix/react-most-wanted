import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount, shallow } from 'enzyme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const theme = getMuiTheme(lightBaseTheme)
const muiThemeProvider = new MuiThemeProvider({ muiTheme: theme});
const { muiTheme } = muiThemeProvider.getChildContext();

function nodeWithThemeProp(node) {
  return React.cloneElement(node, { muiTheme });
}

export function shallowWithTheme(node) {
  return shallow(nodeWithThemeProp(node), { context: { muiTheme } });
};

export function mountWithTheme(node) {
  return mount(nodeWithThemeProp(node), {
    context: { muiTheme },
    childContextTypes: { muiTheme: React.PropTypes.object }
  });
};
