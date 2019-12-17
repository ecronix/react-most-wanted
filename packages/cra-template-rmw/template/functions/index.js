const loadFunctions = require('firebase-function-tools')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const settings = { timestampsInSnapshots: true }
const config = functions.config().firebase

admin.initializeApp(config)
admin.firestore().settings(settings)

loadFunctions(__dirname, exports)
