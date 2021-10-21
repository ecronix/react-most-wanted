import { database } from 'firebase-functions'
import admin from 'firebase-admin'
import splitStringToArray from '../../utils/splitStringToArray'

exports = module.exports = database
  .ref('/users/{userUid}')
  .onWrite(async (eventSnapshot, context) => {
    const { userUid } = context.params
    if (eventSnapshot.after.val()) {
      const user = eventSnapshot.after.val()
      await admin
        .firestore()
        .doc(`/users/${userUid}/`)
        .set(
          {
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            search: splitStringToArray(user.displayName || ''),
          },
          { merge: true }
        )
    } else {
      await admin.firestore().doc(`/users/${userUid}/`).delete()
    }
  })
