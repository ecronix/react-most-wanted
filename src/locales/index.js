import {addLocaleData} from 'react-intl';
import en_messages from './en';
import de_messages from './de';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';

const locales = [
  {
    locale: 'en',
    messages: en_messages,
    data: en
  },
  {
    locale: 'de',
    messages: de_messages,
    data: de
  },

]


export function getLocaleMessages(locale){

  const localization=locales.find((l)=>{return l.locale===locale});

  if(localization){
    return localization.messages;
  }

  //If no locale is found the first one will be returned
  return locales[0].messages;
}

export function addLocalizationData(){

  locales.map((l)=>{
    addLocaleData(l.data);
    return l;
  });

}


export default locales;
