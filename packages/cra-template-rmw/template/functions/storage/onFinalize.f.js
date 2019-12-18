import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import thumbnails from './thumbnails'

export default functions
  .region('europe-west1')
  .storage.object()
  .onFinalize(async (object, context) => {
    const { name, contentType } = object

    if (name.startsWith('users/') && contentType.startsWith('image')) {
      return thumbnails(object)
    }

    return null
  })
