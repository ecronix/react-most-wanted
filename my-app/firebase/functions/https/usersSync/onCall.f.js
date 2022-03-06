import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import { listAllUsers } from '../../utils/users'
import splitStringToArray from '../../utils/splitStringToArray'

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: '2GB',
}

export default functions
  .runWith(runtimeOpts)
  .https.onCall(async (data, context) => {
    const { auth } = context
    if (!auth) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called ' + 'while authenticated.'
      )
    }

    try {
      const users = await listAllUsers()

      let promises = []

      for (let i = 0; i < users.length; i++) {
        const user = users[i]
        promises.push(
          admin
            .firestore()
            .collection('users')
            .doc(user.uid)
            .set(
              {
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                search: splitStringToArray(user.displayName || ''),
              },
              { merge: true }
            )
        )

        if (promises.length === 499) {
          await Promise.all(promises)
          promises = []
        }
      }

      await Promise.all(promises)

      return { message: 'OK' }
    } catch (error) {
      return { error: error.message }
    }
  })
