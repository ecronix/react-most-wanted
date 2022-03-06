const loadFunctions = require('firebase-function-tools')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const config = functions.config().firebase

admin.initializeApp(config)

loadFunctions(__dirname, exports, true)
