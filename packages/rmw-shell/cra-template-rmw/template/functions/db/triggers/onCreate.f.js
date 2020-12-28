import { database } from 'firebase-functions'

export default database.ref('/triggers/{uid}').onWrite(snap => {
  return snap.after.ref.set(null)
})
