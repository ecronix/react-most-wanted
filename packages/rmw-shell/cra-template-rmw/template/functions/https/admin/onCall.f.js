import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

export default functions.https.onCall(async (data, context) => {
  const { auth } = context
  if (!auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called ' + 'while authenticated.'
    )
  }

  const { uid } = auth

  console.log('uid', uid)
  console.log('auth', auth)

  try {
    await admin.database().ref(`admins/${uid}`).set(true)
    return { message: 'OK' }
  } catch (error) {
    return error
  }
})
