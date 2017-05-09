// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


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

exports.notifyOnTaskChange = functions.database.ref('/public_tasks/{taskUid}').onWrite(event => {
  const taskUid = event.params.taskUid;
  const eventSnapshot=event.data;
  const userId=eventSnapshot.child('userId').val();

  const payload = {
    notification: {
      title: 'Task created!',
      body: eventSnapshot.child('title').val(),
      icon: '/apple-touch-icon.png',
      click_action: 'https://www.react-most-wanted.com/tasks'
    }
  };

  // Listing all tokens.
  const registrationToken = 'eJcd8qTn8rg:APA91bGwpmQrj2Z8vvlkoc_ZCJzIJhEohHIY9y_67FB2s2QKY2hX928rAKkAQ3nSny-x6YiLX-ylXE5Ncvw-dAScB2XdR056rnYDbwxMYiLLoV1rWd95vskUbz73kG6pKYD1rF8NmDLC';

  admin.messaging().sendToDevice(registrationToken, payload)
  .then(function(response) {
    // See the MessagingDevicesResponse reference documentation for
    // the contents of response.
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });


});

exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {
  const user = event.data; // The Firebase user.

  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.

  return sendWelcomeEmail(email, displayName);
});


exports.sendByeEmail = functions.auth.user().onDelete(event => {

  const user = event.data;

  const email = user.email;
  const displayName = user.displayName;

  return sendGoodbyEmail(email, displayName);
});

function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: '"Tarik Huber" <huber.tarik@gmail.com>',
      to: email
    };

    // The user unsubscribed to the newsletter.
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${displayName}!, Welcome to ${APP_NAME}. I hope you will enjoy the demo application.`;
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New welcome email sent to:', email);
    });
  }

  function sendGoodbyEmail(email, displayName) {
    const mailOptions = {
      from: '"Tarik Huber" <huber.tarik@gmail.com>',
        to: email
      };

      // The user unsubscribed to the newsletter.
      mailOptions.subject = `Bye!`;
      mailOptions.text = `Hey ${displayName}!, We confirm that we have deleted your ${APP_NAME} account.`;
      return mailTransport.sendMail(mailOptions).then(() => {
        console.log('Account deletion confirmation email sent to:', email);
      });
    }

    /*
    exports.sendTasksNotification = functions.database.ref('/public_tasks/{taskUid}/{userId}').onWrite(event => {
    const taskUid = event.params.taskUid;
    const userId = event.params.userId;


    console.log('New task created UID:', taskUid, ' from userId:', userId);

    // Get the list of device notification tokens.
    const getDeviceTokensPromise = admin.database().ref(`/users/${userId}/mToken`).once('value');

    // Get the follower profile.
    const getUserProfilePromise = admin.auth().getUser(userId);

    return Promise.all([getUserProfilePromise]).then(results => {
    const user = results[0];

    console.log('Fetched follower profile', user);

    // Notification details.
    const payload = {
    notification: {
    title: 'Task created!',
    body: `A new task is created :)`,
    icon: '/apple-touch-icon.png'
  }
};

// Listing all tokens.
const tokens = Object.keys([user.mToken]);

// Send notifications to all tokens.
return admin.messaging().sendToDevice(tokens, payload).then(response => {
// For each message check if there was an error.
const tokensToRemove = [];
response.results.forEach((result, index) => {
const error = result.error;
if (error) {
console.error('Failure sending notification to', tokens[index], error);
// Cleanup the tokens who are not registered anymore.
if (error.code === 'messaging/invalid-registration-token' ||
error.code === 'messaging/registration-token-not-registered') {
tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
}
}
});
return Promise.all(tokensToRemove);
});
});
});
*/
