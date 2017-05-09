
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

  // Only edit data when it is first created.
  if (event.data.previous.exists()) {
    return;
  }


  const taskUid = event.params.taskUid;
  const eventSnapshot=event.data;
  const userId=eventSnapshot.child('userId').val();

  admin.database().ref(`/users`).once('value')
  .then(snapshot =>{

    let user=null;
    let registrationTokens=[];


    snapshot.forEach(function(childSnapshot) {

      const childData = childSnapshot.val();

      if(childSnapshot.key===userId){
        user=childData;
      }else{
        childSnapshot.child('notificationTokens').forEach(token =>{
          if(token.val()){
            registrationTokens.push(token.key);
          }
        });

      }

    });

    const payload = {
      notification: {
        title: user?`${user.displayName} created a Task!`: 'Task created!',
        body: eventSnapshot.child('title').val(),
        icon: (user && user.photoURL!==undefined)?user.photoURL:'/apple-touch-icon.png',
        click_action: 'https://www.react-most-wanted.com/tasks'
      }
    };

    if(registrationTokens.length){
      admin.messaging().sendToDevice(registrationTokens, payload)
      .then(function(response) {
        // See the MessagingDevicesResponse reference documentation for
        // the contents of response.
        console.log("Successfully sent message:", response);
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
      });
    }

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
