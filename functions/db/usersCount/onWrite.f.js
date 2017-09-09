const functions = require('firebase-functions');
const counting = require('../../utils/counting')

exports = module.exports = functions.database.ref('/users_count').onWrite(
  (event) => counting.handleRecount(event, 'users')
)
