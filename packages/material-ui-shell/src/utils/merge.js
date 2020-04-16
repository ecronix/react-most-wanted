export default function (obj1, obj2) {
  let temp = { ...obj1, ...obj2 }

  Object.keys(temp).forEach((key) => {
    if (typeof temp[key] === 'object') {
      temp[key] = { ...obj1[key], ...obj2[key] }
    }
  })

  return temp
}
