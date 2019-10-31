const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

module.exports = {
  notifyUser: async (userUid, payload) => {
    console.log(userUid, payload)

    const snapshot = await admin
      .database()
      .ref(`/notification_tokens/${userUid}`)
      .once('value')

    let registrationTokens = []

    if (snapshot.exists()) {
      snapshot.forEach(token => {
        if (token.val()) {
          registrationTokens.push(token.key)
        }
      })
    }

    if (registrationTokens.length) {
      await admin.messaging().sendToDevice(registrationTokens, payload)
    } else {
      /*
      if (functions.config().email_notifications) {
        const emailNotificationSnap = admin()
          .database()
          .ref(`email_notifications/${userUid}`)
          .once('value')

      
        if (emailNotificationSnap.exists()) {
          const userSnap = await admin
            .database()
            .ref(`users/${userUid}`)
            .once('value')

          if (userSnap.exists()) {
            const { email = false } = userSnap.val()
            const { body = '', title = '', click_action = '' } = payload
            const mailTransport = nodemailer.createTransport(functions.config().email_notifications.transport)

            if (email) {
              const mailOptions = {
                to: email,
                subject: title,
                text: `${body}
                ${click_action}`
              }

              await mailTransport.sendMail(mailOptions)
              console.log('Notification email send!')
            }
          }
        }
      }
      */

      console.log('Not tokens registered')
      return null
    }

    return 1
  }
}
