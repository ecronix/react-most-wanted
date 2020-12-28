import { database } from 'firebase-functions'
import admin from 'firebase-admin'

export default database
  .ref('/user_chat_messages/{senderUid}/{receiverUid}/{messageUid}')
  .onUpdate(async (data, context) => {
    const { authType, params, timestamp } = context
    const { senderUid, receiverUid, messageUid } = params

    if (authType === 'ADMIN') {
      return
    }

    if (data.after.child('isRead').val() === true) {
      await admin
        .database()
        .ref(`/user_chat_messages/${receiverUid}/${senderUid}/${messageUid}`)
        .update({
          isRead: timestamp,
        })

      await admin
        .database()
        .ref(`/user_chats/${senderUid}/${receiverUid}`)
        .update({ isRead: timestamp })

      await admin
        .database()
        .ref(`/user_chats/${receiverUid}/${senderUid}`)
        .update({ isRead: timestamp })
    }

    return
  })
