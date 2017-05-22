
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

exports.countTasksChange = functions.database.ref('/public_tasks/{id}').onWrite(
  (event)=> counting.handleListChange(event, 'public_tasks_count')
);

exports.recountTasks = functions.database.ref('/public_tasks_count').onWrite(
  (event)=> counting.handleRecount(event, 'public_tasks')
);

exports.countUsersChange = functions.database.ref('/users/{id}').onWrite(
  (event)=> counting.handleListChange(event, 'users_count')
);

exports.recountUsers = functions.database.ref('/users_count').onWrite(
  (event)=> counting.handleRecount(event, 'users')
);

exports.notifyOnTaskChange = functions.database.ref('/public_tasks/{taskUid}').onWrite(
  (event)=> messaging.handleTaskAdded(event, admin)
);

exports.updateUserDataOnChange = functions.database.ref('/users/{id}').onWrite(
  (event)=> {

    // Only edit data when it is edited.
    if (!event.data.previous.exists()) {
      return;
    }

    let tasksRef=admin.database().ref("/public_tasks");

    var query = tasksRef.orderByChild("userId").equalTo(event.params.id);

    const eventSnapshot=event.data;
    const userName=eventSnapshot.child('displayName').val();
    const userPhotoURL=eventSnapshot.child('photoURL').val();

    return query.once('value')
    .then((snapshot) =>{

      var updates = {};
      snapshot.forEach((childSnapshot) => {
        updates[`/${childSnapshot.key}/userName`] = userName;
        updates[`/${childSnapshot.key}/userPhotoURL`] = userPhotoURL;
      });


      return tasksRef.update(updates, function(error) {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Task synced with user successfully!');
        }
      });

    });

  }
);

exports.sendWelcomeEmail = functions.auth.user().onCreate(
  (event) => userNotifications.sendWelcomeEmail(event, mailTransport, APP_NAME)
);

exports.sendByeEmail = functions.auth.user().onDelete(
  (event) => userNotifications.sendByeEmail(event, mailTransport, APP_NAME)
);
