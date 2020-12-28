import admin from 'firebase-admin'

const setClaim = async (uid, name, value = true) => {
  const user = await admin.auth().getUser(uid)

  const { [name]: claimName, ...rest } = user.customClaims || {}

  await admin.auth().setCustomUserClaims(uid, { ...rest, [name]: value })
}

const removeClaim = async (uid, name) => {
  const user = await admin.auth().getUser(uid)

  const { [name]: claimName, ...rest } = user.customClaims || {}

  await admin.auth().setCustomUserClaims(uid, { ...rest })
}

export { setClaim, removeClaim }
