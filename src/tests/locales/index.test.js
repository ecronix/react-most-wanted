import {getLocaleMessages}  from '../../locales';
import en_messages from '../../locales/en';
import de_messages from '../../locales/de';

describe('locales', () => {

  it('should return locale messages', () => {
    expect(
      getLocaleMessages('de')
    ).toEqual(de_messages)
  })

  it('should return default locale on wrong input', () => {
    expect(
      getLocaleMessages('de2')
    ).toEqual(en_messages)
  })


})
