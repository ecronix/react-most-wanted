import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

export default functions
  .region('europe-west1')
  .database.ref('/group_chat_messages/{groupUid}/{messageUid}')
  .onCreate(async (eventSnapshot, context) => {
    const { timestamp, params } = context
    const { groupUid, messageUid } = params

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
      authorName,
    } = snapValues
    let lastMessage = message

    if (!message) {
      if (link) {
        lastMessage = 'Link'
      }
      if (image) {
        lastMessage = 'Foto'
      }
      if (location) {
        lastMessage = 'Position'
      }
      if (audio) {
        lastMessage = 'Audio'
      }
    }

    // sender chat
    await admin.database().ref(`/group_chats/${groupUid}`).update({
      lastMessage: lastMessage,
      lastCreated: created,
    })

    const members = []

    const membersSnap = await admin
      .database()
      .ref(`group_chats/${groupUid}/members`)
      .once('value')

    if (membersSnap.exists()) {
      membersSnap.forEach((ms) => {
        members.push({ key: ms.key, val: ms.val() })
      })
    }

    for (let i = 0; i < members.length; i++) {
      const { key, val } = members[i]

      const messages = []

      const payload = {
        notification: {
          title: `${authorName}`,
          body: lastMessage,
        },
        webpush: {
          notification: {
            title: `${authorName}`,
            body: lastMessage,
            icon: authorPhotoUrl ? authorPhotoUrl : '/apple-touch-icon.png',
            image,
            click_action: `https://www.react-most-wanted.com/chats/${groupUid}`,
          },
        },
        data: {
          test: 'test',
        },
      }

      console.log('key', key)

      const tokensSnap = await admin
        .database()
        .ref(`notification_tokens/${key}`)
        .once('value')

      if (tokensSnap.exists()) {
        tokensSnap.forEach((t) => {
          console.log('token', t.key)
          messages.push({ token: t.key, ...payload })
        })
        console.log('messages', messages)
        await admin.messaging().sendAll(messages)
      } else {
        console.log('No tokens found for user', key)
      }
    }

    return
  })
