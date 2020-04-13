const getUsersPreferredLanguages = () => {
  if (navigator.languages !== undefined) {
    return navigator.languages
  } else if (navigator.language !== undefined) {
    return [navigator.language]
  } else {
    return undefined
  }
}

const parseLanguages = (acceptedLangs, defaultLang = false) => {
  const userPref = getUsersPreferredLanguages()

  const match = userPref
    ? userPref.find((lang) => acceptedLangs.includes(lang))
    : undefined

  if (match === undefined && defaultLang !== false) {
    return defaultLang
  }

  return match
}

const getLocaleMessages = (l, ls) => {
  if (ls) {
    for (let i = 0; i < ls.length; i++) {
      if (ls[i]['locale'] === l) {
        return ls[i]['messages']
      }
    }
  }

  return {}
}

const formatMessage = (messages = [], id) => {
  return messages[id] || id
}

export { formatMessage, getLocaleMessages }
export default parseLanguages
