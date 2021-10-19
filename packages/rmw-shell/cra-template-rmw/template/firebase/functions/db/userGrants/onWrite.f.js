import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import { setClaim, removeClaim } from '../../utils/customClaims'

const wait = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), t)
  })
}

const random = (min, max) => {
  return Math.random() * (max - min) + min
}

export default functions
  .region('europe-west1')
  .database.ref('user_grants/{uid}/{grant}')
  .onWrite(async (snap, context) => {
    const value = snap.after.val()
    const { uid, grant } = context.params

    await admin
      .firestore()
      .doc(`/user_grants/${uid}/`)
      .set(
        { [grant]: value ? value : admin.firestore.FieldValue.delete() },
        { merge: true }
      )

    console.log('Waiting....')
    await wait(random(1000, 4000))

    if (snap.after.exists() && value.indexOf('storage') !== -1) {
      await setClaim(uid, grant)
    } else {
      await removeClaim(uid, grant)
    }

    const user = await admin.auth().getUser(uid)

    console.log('customClaims', Object.keys(user.customClaims).length)
    console.log('customClaims', user.customClaims)

    return
  })
