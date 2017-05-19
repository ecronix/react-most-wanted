module.exports = {
  handleTaskAdded: (event, admin) => {

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
  },

};
