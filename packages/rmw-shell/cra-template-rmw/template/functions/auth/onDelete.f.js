import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import moment from 'moment'
import nodemailer from 'nodemailer'

const gmail = functions.config().gmail || {}

const mailTransport = nodemailer.createTransport(
  `smtps://${gmail.email}:${gmail.password}@smtp.gmail.com`
)

export default functions.auth.user().onDelete(async (user, context) => {
  const { email, displayName, uid, providerData = [] } = user || {}
  const { providerId: id } = providerData[0] || {
    providerId: email ? 'password' : 'phone',
  }
  const providerId = id.replace('.com', '')

  await admin.database().ref(`/users/${uid}`).set(null)
  await admin.database().ref(`/notification_tokens/${uid}`).set(null)
  await admin.database().ref(`/users_chats/${uid}`).set(null)
  await admin
    .database()
    .ref(`/users_count`)
    .transaction((current) => (current || 0) - 1)

  if (providerId) {
    await admin
      .database()
      .ref(`/provider_count/${providerId}`)
      .transaction((current) => (current || 0) - 1)
  }

  const mailOptions = {
    from: `"Tarik Huber" <${gmail.email}>`,
    to: email,
    subject: `Bye!`,
    text: `
Hi ${displayName}!,

We confirm that your React Most Wanted account is deleted.
All data related to it is also deleted!

Thanks again for checking out the demo :)
If you have any suggestion to improve it feel free to response to this E-Mail.

Cheers,
Tarik

This is an automated E-Mail.
`,
  }

  await mailTransport.sendMail(mailOptions)

  return
})
