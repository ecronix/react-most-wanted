import { database } from 'firebase-functions'
import admin from 'firebase-admin'

export default database
  .ref('/roles/{roleUid}')
  .onWrite((eventSnap, context) => {
    // Exit when the data is not deleted.
    if (eventSnap.after.exists()) {
      return null
    }

    const roleUid = context.params.roleUid

    return admin
      .database()
      .ref(`role_grants/${roleUid}`)
      .remove()
  })
