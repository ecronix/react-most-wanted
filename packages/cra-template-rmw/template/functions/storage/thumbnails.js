const functions = require('firebase-functions')
const admin = require('firebase-admin')
const createThumbnail = require('firebase-function-tools/lib/thumbnail')

module.exports = async object => {
  const thumbnail = await createThumbnail(object)

  if (thumbnail) {
    const { fileDir, downloadURL } = thumbnail

    await admin
      .database()
      .ref(fileDir)
      .update({ thumbnail: downloadURL })
  }

  return
}
