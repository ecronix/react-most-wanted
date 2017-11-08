import {getLocaleMessages}  from './index';
import pt_br_messages from './pt_br';
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
    ).toEqual(pt_br_messages)
  })


})
