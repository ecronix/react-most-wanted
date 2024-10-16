import { database } from 'firebase-functions'
import admin from 'firebase-admin'

export default database
  .ref('/group_chats/{groupUid}/members/{uid}')
  .onDelete(async (snapshot, context) => {
    const { uid, groupUid } = context.params

    await admin.database().ref(`user_chats/${uid}/${groupUid}`).set(null)

    return
  })
