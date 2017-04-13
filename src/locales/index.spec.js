import {getLocaleMessages}  from './index';
import en_messages from './en';
import de_messages from './de';

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
