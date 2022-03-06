import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

export default functions
  .region('europe-west1')
  .database.ref('/user_chat_messages/{senderUid}/{receiverUid}/{messageUid}')
  .onCreate(async (eventSnapshot, context) => {
    const { timestamp, params } = context
    const { senderUid, receiverUid, messageUid } = params

    if (context.authType === 'ADMIN') {
      return null
    }

    const snapValues = eventSnapshot.val()
    const {
      message = '',
      link,
      image,
      location,
      audio,
      authorUid,
      created,
      authorPhotoUrl,
    } = snapValues
    let lastMessage = message
    const senderRef = admin.database().ref(`/users/${senderUid}`).once('value')

    const senderSnap = await admin
      .database()
      .ref(`/users/${senderUid}`)
      .once('value')

    const receiverSnap = await admin
      .database()
      .ref(`/users/${receiverUid}`)
      .once('value')

    const {
      displayName: senderName = null,
      photoURL: senderPhoto = null,
    } = senderSnap.val()
    const {
      displayName: receiverName = null,
      photoURL: receiverPhoto = null,
    } = receiverSnap.val()

    if (!message) {
      if (link) {
        lastMessage = 'Link'
      }
      if (image) {
        lastMessage = 'Photo'
      }
      if (location) {
        lastMessage = 'Position'
      }
      if (audio) {
        lastMessage = 'Audio'
      }
    }

    // receiver chat message
    await admin
      .database()
      .ref(`/user_chat_messages/${receiverUid}/${senderUid}/${messageUid}`)
      .update(snapValues)

    // sender chat message
    await admin
      .database()
      .ref(`/user_chat_messages/${senderUid}/${receiverUid}/${messageUid}`)
      .update({
        isSend: timestamp,
      })

    // sender chat
    await admin
      .database()
      .ref(`/user_chats/${senderUid}/${receiverUid}`)
      .update({
        unread: 0,
        displayName: receiverName,
        photoURL: receiverPhoto,
        lastMessage: lastMessage,
        authorUid: senderUid,
        lastCreated: created,
        isSend: timestamp,
        isRead: null,
      })

    // receiver chat
    await admin
      .database()
      .ref(`/user_chats/${receiverUid}/${senderUid}`)
      .update({
        displayName: senderName,
        photoURL: senderPhoto,
        authorUid: senderUid,
        lastMessage: lastMessage,
        lastCreated: created,
        isRead: null,
      })

    // update unread
    await admin
      .database()
      .ref(`/user_chats/${receiverUid}/${senderUid}/unread`)
      .transaction((number) => {
        return (number || 0) + 1
      })

    if (authorUid !== receiverUid) {
      const messages = []

      const payload = {
        notification: {
          title: `${snapValues.authorName}`,
          body: lastMessage,
        },
        webpush: {
          notification: {
            title: `${snapValues.authorName}`,
            body: lastMessage,
            icon: authorPhotoUrl ? authorPhotoUrl : '/apple-touch-icon.png',
            image,
            click_action: `https://www.react-most-wanted.com/chats/${senderUid}`,
          },
        },
        data: {
          test: 'test',
        },
      }

      const tokensSnap = await admin
        .database()
        .ref(`notification_tokens/${receiverUid}`)
        .once('value')

      if (tokensSnap.exists()) {
        tokensSnap.forEach((t) => {
          messages.push({ token: t.key, ...payload })
        })
      }

      await admin.messaging().sendAll(messages)
    }
  })
