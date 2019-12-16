const load = require('firebase-function-tools/lib/load')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const settings = { timestampsInSnapshots: true }
const config = functions.config().firebase

admin.initializeApp(config)
admin.firestore().settings(settings)

load.loadFunctions(__dirname, exports)
