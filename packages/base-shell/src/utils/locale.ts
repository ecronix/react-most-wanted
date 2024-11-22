import { defineMessages } from 'react-intl'

const getUsersPreferredLanguages = (): string[] | undefined => {
  if (navigator.languages !== undefined) {
    return navigator.languages
  } else if (navigator.language !== undefined) {
    return [navigator.language]
  } else {
    return undefined
  }
}

const parseLanguages = (acceptedLangs: string[], defaultLang: string | false = false): string | false | undefined => {
  const userPref = getUsersPreferredLanguages()

  const match = userPref
    ? userPref.find((lang) => acceptedLangs.includes(lang))
    : undefined

  if (match === undefined && defaultLang !== false) {
    return defaultLang
  }

  return match
}

const getLocaleMessages = async (l: string, ls: { locale: string, messages: any }[]): Promise<Record<string, any>> => {
  if (ls) {
    for (let i = 0; i < ls.length; i++) {
      if (ls[i]['locale'] === l) {
        const { default: messages } = await defineMessages(ls[i].messages)

        return messages
      }
    }
  }

  return {}
}

const formatMessage = (messages: Record<string, string> = {}, id: string): string => {
  return messages[id] || id
}

export {
  formatMessage,
  getLocaleMessages,
  parseLanguages
}