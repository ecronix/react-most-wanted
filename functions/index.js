
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const nodemailer = require('nodemailer');


//To set this configs use this command
//firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

const APP_NAME = 'React Most Wanted';

const counting = require('./counting');
const messaging = require('./messaging');
const userNotifications = require('./userNotifications');
const userSync = require('./userSync');

exports.handleTasksChange = functions.database.ref('/public_tasks/{taskUid}').onWrite(
  (event)=> {
    return Promise.all([
      counting.handleListChange(event, 'public_tasks_count'),
      messaging.handleTaskAdded(event, admin)
    ])
  }
);

exports.recountTasks = functions.database.ref('/public_tasks_count').onWrite(
  (event)=> counting.handleRecount(event, 'public_tasks')
);

exports.handleUserChange = functions.database.ref('/users/{userUid}').onWrite(
  (event)=> {
    return Promise.all([
      counting.handleListChange(event, 'users_count'),
      userSync.syncPublicTasks(event, admin)
    ])
  }
);

exports.recountUsers = functions.database.ref('/users_count').onWrite(
  (event)=> counting.handleRecount(event, 'users')
);

exports.sendWelcomeEmail = functions.auth.user().onCreate(
  (event) => userNotifications.sendWelcomeEmail(event, mailTransport, APP_NAME)
);

exports.sendByeEmail = functions.auth.user().onDelete(
  (event) => userNotifications.sendByeEmail(event, mailTransport, APP_NAME)
);
