import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import moment from 'moment'
import nodemailer from 'nodemailer'
import notifications from 'firebase-function-tools/lib/notifications'

const gmailEmail = encodeURIComponent(functions.config().gmail.email)
const gmailPassword = encodeURIComponent(functions.config().gmail.password)
const mailTransport = nodemailer.createTransport(
  `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`
)

export default functions
  .region('europe-west1')
  .database.ref('/user_chat_messages/{senderUid}/{receiverUid}/{messageUid}')
  .onCreate((eventSnapshot, context) => {
    console.log('authType', context.authType)

    if (context.authType === 'ADMIN') {
      return null
    }

    console.log('authType executed!', 'YES')

    const senderUid = context.params.senderUid
    const receiverUid = context.params.receiverUid
    const messageUid = context.params.messageUid
    const snapValues = eventSnapshot.val()
    const senderRef = admin
      .database()
      .ref(`/users/${senderUid}`)
      .once('value')
    const receiverRef = admin
      .database()
      .ref(`/users/${receiverUid}`)
      .once('value')
    const senderChatRef = admin
      .database()
      .ref(`/user_chats/${senderUid}/${receiverUid}`)
    const receiverChatRef = admin
      .database()
      .ref(`/user_chats/${receiverUid}/${senderUid}`)
    const receiverChatUnreadRef = admin
      .database()
      .ref(`/user_chats/${receiverUid}/${senderUid}/unread`)
    const receiverChatMessageRef = admin
      .database()
      .ref(`/user_chat_messages/${receiverUid}/${senderUid}/${messageUid}`)
    const senderChatMessageRef = admin
      .database()
      .ref(`/user_chat_messages/${senderUid}/${receiverUid}/${messageUid}`)

    console.log('values', eventSnapshot.val())
    console.log(
      `Message ${messageUid} ${snapValues.message} created! Sender ${senderUid}, receiver ${receiverUid}`
    )

    return Promise.all([senderRef, receiverRef]).then(results => {
      const senderSnap = results[0]
      const receiverSnap = results[1]

      let lastMessage = snapValues.message ? snapValues.message : ''

      if (!lastMessage) {
        if (snapValues.link) {
          lastMessage = 'Link'
        }
        if (snapValues.image) {
          lastMessage = 'Foto'
        }
        if (snapValues.location) {
          lastMessage = 'Position'
        }
        if (snapValues.audio) {
          lastMessage = 'Audio'
        }
      }

      const udateReceiverChatMessage = receiverChatMessageRef
        .update(snapValues)
        .then(() => {
          return senderChatMessageRef.update({
            isSend: context.timestamp,
          })
        })

      const udateSenderChat = senderChatRef.update({
        unread: 0,
        displayName: receiverSnap.child('displayName').val(),
        photoURL: receiverSnap.child('photoURL').val(),
        lastMessage: lastMessage,
        authorUid: senderUid,
        lastCreated: snapValues.created,
        isSend: context.timestamp,
        isRead: null,
      })
      const udateReceiverChat = receiverChatRef.update({
        displayName: senderSnap.child('displayName').val(),
        photoURL: senderSnap.child('photoURL').val(),
        authorUid: senderUid,
        lastMessage: lastMessage,
        lastCreated: snapValues.created,
        isRead: null,
      })
      const updateReceiverUnred = receiverChatUnreadRef.transaction(number => {
        return (number || 0) + 1
      })

      let notifyUser = null

      if (snapValues.authorUid !== receiverUid) {
        const payload = {
          notification: {
            title: `${snapValues.authorName} `,
            body: lastMessage,
            icon: snapValues.authorPhotoUrl
              ? snapValues.authorPhotoUrl
              : '/apple-touch-icon.png',
            click_action: `https://www.react-most-wanted.com/chats/edit/${senderUid}`,
            tag: `chat`,
          },
        }

        notifyUser = notifications.notifyUser(receiverUid, payload).then(() => {
          return senderChatMessageRef
            .update({
              isReceived: context.timestamp,
            })
            .then(() => {
              return senderChatRef.update({
                isReceived: context.timestamp,
              })
            })
        })
      }

      return Promise.all([
        udateReceiverChatMessage,
        udateSenderChat,
        udateReceiverChat,
        updateReceiverUnred,
        notifyUser,
      ])
    })
  })
