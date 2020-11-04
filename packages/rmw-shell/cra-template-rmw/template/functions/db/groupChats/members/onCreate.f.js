import { database } from 'firebase-functions'
import admin from 'firebase-admin'

export default database
  .ref('/group_chats/{groupUid}/members/{uid}')
  .onCreate(async (snapshot, context) => {
    const { uid, groupUid } = context.params

    const chatSnap = await admin
      .database()
      .ref(`group_chats/${groupUid}`)
      .once('value')

    const { name = 'Grooup chat' } = chatSnap.val() || {}

    await admin
      .database()
      .ref(`user_chats/${uid}/${groupUid}`)
      .update({
        displayName: name,
        path: `group_chat_messages/${groupUid}`,
        lastMessage: 'Group chat',
      })

    return
  })
