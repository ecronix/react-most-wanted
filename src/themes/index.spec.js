import {getThemeSource}  from './index';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import ics_theme from './ics_theme';

describe('locales', () => {

  it('should return theme source', () => {
    expect(
      getThemeSource('ics')
    ).toEqual(ics_theme)
  })

  it('should return default theme on wrong input', () => {
    expect(
      getThemeSource('themeX')
    ).toEqual(lightBaseTheme)
  })


})
