import admin from 'firebase-admin'
import createThumbnail from 'firebase-function-tools/lib/thumbnail'

export default async function(object) {
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
