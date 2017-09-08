const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.
const counting = require('../utils/counting')
const userSync = require('./userSync');

exports = module.exports = functions.database.ref('/users/{userUid}').onWrite(
  (event) => {
    return Promise.all([
      counting.handleListChange(event, 'users_count'),
      userSync.syncPublicTasks(event, admin),
      userSync.syncPublicChats(event, admin)
    ])
  }
)
