import { database } from 'firebase-functions'

export default database
  .ref('/triggers/{roleUid}')
  .onWrite((eventSnap, context) => {
    return eventSnap.after.ref.set(null)
  })
