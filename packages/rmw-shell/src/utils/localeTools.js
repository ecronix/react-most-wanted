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
    ? userPref.find(lang => acceptedLangs.includes(lang))
    : undefined

  if (match === undefined && defaultLang !== false) {
    return defaultLang
  }

  return match
}

const formatMessage = (messages, id) => {
  return messages[id] || id
}

export { formatMessage }
export default parseLanguages
