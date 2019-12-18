import { database } from 'firebase-functions'
import admin from 'firebase-admin'

export default database
  .ref('/public_chats/{taskUid}')
  .onCreate((eventSnapshot, context) => {
    const authorName = eventSnapshot.child('authorName').val()
    const authorPhotoUrl = eventSnapshot.child('authorPhotoUrl').val()

    return admin
      .database()
      .ref(`/notification_tokens`)
      .once('value')
      .then(nTokens => {
        let registrationTokens = []

        nTokens.forEach(user => {
          user.forEach(token => {
            registrationTokens.push(token.key)
          })
        })

        const payload = {
          notification: {
            title: `${authorName || 'UserName'}`,
            body: eventSnapshot.child('message').val(),
            icon: authorPhotoUrl || '/apple-touch-icon.png',
            click_action: 'https://www.react-most-wanted.com/public_chats',
            tag: 'public_chat',
          },
        }

        if (registrationTokens.length) {
          return admin.messaging().sendToDevice(registrationTokens, payload)
        } else {
          console.log('Not tokens registered')
        }

        return null
      })
  })
