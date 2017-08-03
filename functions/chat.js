module.exports = {
  handleUserChatMessageCreate: (event, admin) => {

    if(event.auth.admin){
      return;
    }

    const senderUid = event.params.senderUid;
    const receiverUid = event.params.receiverUid;
    const messageUid = event.params.messageUid;
    const eventSnapshot = event.data;
    const snapValues=eventSnapshot.val();
    const senderChatRef=admin.database().ref(`/user_chats/${senderUid}/${receiverUid}`);
    const receiverChatRef=admin.database().ref(`/user_chats/${receiverUid}/${senderUid}`);
    const receiverChatMessageRef=admin.database().ref(`/user_chat_messages/${receiverUid}/${senderUid}/${messageUid}`);

    console.log(`Message ${messageUid} ${snapValues.message} created! Sender ${senderUid}, receiver ${receiverUid}`);

    return receiverChatMessageRef.update(snapValues).then(()=>{
      return senderChatRef.update({
        lastMessage: snapValues.message,
        lastCreated: snapValues.created
      }).then(()=>{
        return receiverChatRef.update({
          displayName: snapValues.authorName,
          photoURL: snapValues.photoURL?snapValues.photoURL:'',
          lastMessage: snapValues.message,
          lastCreated: snapValues.created
        }).then(()=>{

          if(snapValues.authorUid!==receiverUid){
            return admin.database().ref(`/users/${receiverUid}`).once('value')
            .then(snapshot =>{

              let registrationTokens=[];

              snapshot.child('notificationTokens').forEach(token =>{
                if(token.val()){
                  registrationTokens.push(token.key);
                }
              });

              const payload = {
                notification: {
                  title: `New message from ${snapValues.authorName} `,
                  body: snapValues.message,
                  icon: snapValues.authorPhotoUrl?snapValues.authorPhotoUrl:'/apple-touch-icon.png',
                  click_action: `https://www.react-most-wanted.com/chats/edit/${senderUid}`,
                  tag: `chat`,
                  timestamp: snapValues.created.toString(),
                  data: 'test',
                }
              };

              if(registrationTokens.length){
                return admin.messaging().sendToDevice(registrationTokens, payload)
                .then(function(response) {
                  // See the MessagingDevicesResponse reference documentation for
                  // the contents of response.
                  console.log("Successfully sent message:", response);
                })
                .catch(function(error) {
                  console.log("Error sending message:", error);
                });
              }else{
                console.log("Not tokens registered");
                return;
              }

            });
          }

          return;

        });
      })
    });

  },

};
