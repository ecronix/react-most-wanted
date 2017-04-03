import en_messages from './en.js';
import de_messages from './de.js';

const locales = [
  {
    locale: 'en',
    messages: en_messages
  },
  {
    locale: 'de',
    messages: de_messages
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

export default locales;
