import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: '2GB',
}

export default functions
  .region('europe-west1')
  .runWith(runtimeOpts)
  .database.ref('/group_chat_messages/{groupUid}/{messageUid}')
  .onCreate(async (eventSnapshot, context) => {
    const { params } = context
    const { groupUid } = params

    if (context.authType === 'ADMIN') {
      return null
    }

    const snapValues = eventSnapshot.val()
    const {
      message = '',
      link,
      image = '',
      location,
      audio,
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
        lastMessage = 'Photo'
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
          click_action: `/chats/${groupUid}`,
        },
      },
      data: {
        test: 'test',
      },
    }

    const isAllSnap = await admin
      .database()
      .ref(`group_chats/${groupUid}/members/all`)
      .once('value')

    if (isAllSnap.exists() && isAllSnap.val()) {
      const notificationTokensSnap = await admin
        .database()
        .ref(`/notification_tokens`)
        .once('value')
      let registrationTokens = []

      notificationTokensSnap.forEach((user) => {
        user.forEach((token) => {
          registrationTokens.push(token.key)
        })
      })

      if (registrationTokens.length) {
        return admin
          .messaging()
          .sendToDevice(registrationTokens, payload.webpush)
      } else {
        console.log('Not tokens registered')
      }

      /*
      const tokensSnap = await admin
        .database()
        .ref('notification_tokens')
        .once('value')

      if (tokensSnap.exists()) {
        tokensSnap.forEach(async (t) => {
          const tokens = t.val()

          const messages = []

          Object.keys(tokens).map((k) => {
            messages.push({ token: k, ...payload })
            return k
          })

          try {
            await admin.messaging().sendAll(messages)
          } catch (error) {
            console.warn(error)
          }
        })
      } else {
        console.log('No tokens found')
      }

      */
    } else {
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
        const { key } = members[i]

        const messages = []

        const tokensSnap = await admin
          .database()
          .ref(`notification_tokens/${key}`)
          .once('value')

        if (tokensSnap.exists()) {
          tokensSnap.forEach((t) => {
            messages.push({ token: t.key, ...payload })
          })

          await admin.messaging().sendAll(messages)
        } else {
          console.log('No tokens found for user', key)
        }
      }
    }

    return
  })
