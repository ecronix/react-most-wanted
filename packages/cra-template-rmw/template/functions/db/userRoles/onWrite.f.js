import { database } from 'firebase-functions'
import admin from 'firebase-admin'

exports = module.exports = database
  .ref('/user_roles/{userUid}/{roleUid}')
  .onWrite((eventSnapshot, context) => {
    const userUid = context.params.userUid
    const roleUid = context.params.roleUid

    const roleGrantsRef = admin.database().ref(`role_grants/${roleUid}`)

    return roleGrantsRef.once('value').then(snapshot => {
      let promises = []

      snapshot.forEach(grant => {
        let grantRef = false

        console.log('User role changed:', eventSnapshot.after.val())

        if (eventSnapshot.after.val()) {
          grantRef = admin
            .database()
            .ref(`user_grants/${userUid}/${grant.key}`)
            .set(true)
        } else {
          grantRef = admin
            .database()
            .ref(`user_grants/${userUid}/${grant.key}`)
            .remove()
        }

        promises.push(grantRef)
      })

      return Promise.all(promises)
    })
  })
