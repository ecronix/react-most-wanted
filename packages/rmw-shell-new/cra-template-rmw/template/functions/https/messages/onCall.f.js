import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

export default functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called ' + 'while authenticated.'
    )
  }

  const { payload } = data
  console.log('payload', payload)

  try {
    const response = await admin.messaging().send(payload)
    return { response }
  } catch (error) {
    return error
  }
})
