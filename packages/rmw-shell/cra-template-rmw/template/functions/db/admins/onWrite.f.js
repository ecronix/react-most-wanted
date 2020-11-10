import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import { setClaim, removeClaim } from '../../utils/customClaims'

export default functions
  .region('europe-west1')
  .database.ref('admins/{uid}/')
  .onWrite(async (snap, context) => {
    const value = snap.after.val()
    const uid = context.params.uid

    if (value) {
      await admin.firestore().doc(`/admins/${uid}/`).set({ isAdmin: value })
      await setClaim(uid, 'admin')
    } else {
      await admin.firestore().doc(`/admins/${uid}/`).delete()
      await removeClaim(uid, 'admin')
    }

    return
  })
