const functions = require('firebase-functions')
const admin = require('firebase-admin')
const thumbnails = require('./thumbnails')

exports = module.exports = functions
  .region('europe-west1')
  .storage.object()
  .onFinalize(async (object, context) => {
    const { name, contentType } = object

    if (name.startsWith('users/') && contentType.startsWith('image')) {
      return thumbnails(object)
    }

    return null
  })
