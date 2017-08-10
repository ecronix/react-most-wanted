module.exports = {
  notifyUser: (admin, userUid, payload) => {
    console.log(userUid, payload);

    return admin.database().ref(`/users/${userUid}`).once('value').then(snapshot =>{
      let registrationTokens=[];

      snapshot.child('notificationTokens').forEach(token =>{
        if(token.val()){
          registrationTokens.push(token.key);
        }
      });

      if(registrationTokens.length){
        return admin.messaging().sendToDevice(registrationTokens, payload)
        .then(function(response) {
          console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
          console.log("Error sending message:", error);
        });
      }else{
        console.log("Not tokens registered");
      }

    });

  },

};
