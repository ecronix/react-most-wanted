const MAPPING_TABLE = {
  à: 'a',
  á: 'a',
  â: 'a',
  ã: 'a',
  å: 'a',
  æ: 'ae',
  ç: 'c',
  è: 'e',
  é: 'e',
  ê: 'e',
  ë: 'e',
  ì: 'i',
  í: 'i',
  î: 'i',
  ï: 'i',
  ñ: 'n',
  ò: 'o',
  ó: 'o',
  ô: 'o',
  õ: 'o',
  ù: 'u',
  ú: 'u',
  û: 'u',
  ý: 'y',
  ÿ: 'y',
}

function splitStringToArray(stringToSplit) {
  const listCharacters = stringToSplit.split('')
  var output = []
  //replace special Characters
  for (var i = 0; i < listCharacters.length; i++) {
    if (MAPPING_TABLE[listCharacters[i]] != null) {
      listCharacters[i] = MAPPING_TABLE[listCharacters[i]]
    }
  }
  for (var i = 0; i < listCharacters.length; i++) {
    var temp = [listCharacters[i]]
    for (var j = i + 1; j < listCharacters.length; j++) {
      temp.push(listCharacters[j])
      const joinedString = temp.join('').toLowerCase()
      if (joinedString.length > 2) {
        output.push(joinedString)
      }
    }
  }
  return output
}

export default splitStringToArray
