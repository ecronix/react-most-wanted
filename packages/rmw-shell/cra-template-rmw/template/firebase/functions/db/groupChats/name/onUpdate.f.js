import { database } from 'firebase-functions'
import admin from 'firebase-admin'

export default database
  .ref('/group_chats/{groupUid}/name')
  .onUpdate(async (snapshot, context) => {
    const { groupUid } = context.params

    const chatSnap = await admin
      .database()
      .ref(`group_chats/${groupUid}`)
      .once('value')

    const { members = {} } = chatSnap.val() || {}

    const name = snapshot.after.val() || ''
    const keys = []
    Object.keys(members).map((m) => {
      keys.push(m)
    })

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      await admin.database().ref(`user_chats/${key}/${groupUid}`).update({
        displayName: name,
      })
    }

    return
  })
