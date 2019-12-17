require = require('esm')(module /*, options*/)
const load = require('./load/load')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const settings = { timestampsInSnapshots: true }
const config = functions.config().firebase

admin.initializeApp(config)
admin.firestore().settings(settings)

load.default(__dirname, exports)
