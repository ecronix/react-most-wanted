const functions = require('firebase-functions')
const admin = require('firebase-admin')
try { admin.initializeApp(functions.config().firebase) } catch (e) { } // You do that because the admin SDK can only be initialized once.

exports = module.exports = functions.database.ref('/user_chat_messages/{senderUid}/{receiverUid}/{messageUid}').onUpdate(event => {
  if (event.auth.admin) {
    return null
  }

  const senderUid = event.params.senderUid
  const receiverUid = event.params.receiverUid
  const messageUid = event.params.messageUid
  const senderChatRef = admin.database().ref(`/user_chats/${senderUid}/${receiverUid}`)
  const receiverChatRef = admin.database().ref(`/user_chats/${receiverUid}/${senderUid}`)
  const receiverChatMessageRef = admin.database().ref(`/user_chat_messages/${receiverUid}/${senderUid}/${messageUid}`)

  console.log(`Marking value`, event.data.child('isRead').val())

  if (event.data.child('isRead').val() === true) {
    console.log(`Marking message ${messageUid} as read`)
    return receiverChatMessageRef.update({
      isRead: event.timestamp
    }).then(() => {
      return senderChatRef.update({
        isRead: event.timestamp
      }).then(() => {
        receiverChatRef.update({
          isRead: event.timestamp
        })
      })
    })
  } else {
    return null
  }
})
