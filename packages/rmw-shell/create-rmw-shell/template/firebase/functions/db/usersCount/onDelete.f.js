import { database } from 'firebase-functions'
import admin from 'firebase-admin'
import moment from 'moment'
import usersUtil from 'firebase-function-tools/lib/users'

export default database.ref('/users_count').onDelete((data, context) => {
  const getDBUsers = admin
    .database()
    .ref('users')
    .once('value')
  const getAuthUsers = usersUtil.listAllUsers()

  return Promise.all([getDBUsers, getAuthUsers]).then(results => {
    const dbUsers = results[0]
    const authUsers = results[1]
    let promises = []

    let userUids = []
    let providerCount = {}
    let usersPublicData = {}
    let usersNotificationTokens = {}

    authUsers.forEach(userRecord => {
      const user = userRecord.toJSON()
      let userPublicProviderData = {}

      const creationTime = moment(user.metadata.creationTime)
      const creationTimeFormatted = creationTime.toISOString()

      // Collecting data for provider
      if (user.providerData) {
        user.providerData.forEach((provider, i) => {
          // Counting providers
          const providerId = provider.providerId.replace('.com', '')
          const current = providerCount[providerId] || 0
          providerCount[providerId] = current + 1

          // TO DO sanitise also the registration per month and day counter

          // Collecting public provider data
          userPublicProviderData[i] = {
            displayName: provider.displayName ? provider.displayName : null,
            providerId: provider.providerId,
          }
        })
      }

      // Collecting users public data
      const userUid = user.uid
      const userPublicData = {
        displayName: user.displayName ? user.displayName : null,
        photoURL: user.photoURL ? user.photoURL : null,
        providerData: userPublicProviderData,
        creationTime: creationTimeFormatted,
      }

      usersPublicData[userUid] = userPublicData

      userUids.push(userUid)
    })

    console.log(userUids)

    // Remove unsynced users
    dbUsers.forEach(userSnap => {
      if (userUids.indexOf(userSnap.key) > -1) {
        usersNotificationTokens[userSnap.key] = userSnap
          .child('notificationTokens')
          .val()
      } else {
        console.log(`Delete user ${userSnap.key}`)
        promises.push(
          admin
            .database()
            .ref(`users/${userSnap.key}`)
            .remove()
        )
        promises.push(
          admin
            .database()
            .ref(`notification_tokens/${userSnap.key}`)
            .remove()
        )
      }
    })

    promises.push(
      admin
        .database()
        .ref('provider_count')
        .set(providerCount),
      admin
        .database()
        .ref('users')
        .set(usersPublicData),
      admin
        .database()
        .ref('notification_tokens')
        .set(usersNotificationTokens),
      admin
        .database()
        .ref('users_count')
        .set(authUsers.length)
    )

    return Promise.all(promises)
  })
})
