module.exports = {
  syncPublicTasks: (event, admin) => {

    // Only edit data when it is edited.
    if (!event.data.previous.exists()) {
      return;
    }

    const eventSnapshot=event.data;

    //Sync only if displayName and photoURL changed
    if(!eventSnapshot.child('displayName').changed() && !eventSnapshot.child('photoURL').changed()){
      return;
    }


    let tasksRef=admin.database().ref("/public_tasks");

    var query = tasksRef.orderByChild("userId").equalTo(event.params.userUid);


    const userName=eventSnapshot.child('displayName').val();
    const userPhotoURL=eventSnapshot.child('photoURL').val();



    return query.once('value')
    .then((snapshot) =>{

      var updates = {};
      snapshot.forEach((childSnapshot) => {

        //Update if user is edited and delete if user is deleted
        if(event.data.exists()){
          updates[`/${childSnapshot.key}/userName`] = userName;
          updates[`/${childSnapshot.key}/userPhotoURL`] = userPhotoURL;
        }else{
          updates[`/${childSnapshot.key}`] = null;
        }

      });


      return tasksRef.update(updates, function(error) {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Task synced with user successfully!');
        }
      });

    });

  },
  userCreatedDefaults: (event, admin) => {


    const user = event.data; // The Firebase user.
    const uid = user.uid; // The display name of the user.

    console.log('New User created:', user);


    if(!user.displayName){

      const displayName = 'UserName'; //Default name

      return admin.auth().updateUser(uid, {
        displayName: displayName
      }).then(()=>{

        console.log('User updated');

        let usersRef=admin.database().ref("/users");
        let userRef=usersRef.child(uid);

        let newUser={
          displayName: displayName,
        }

        return userRef.update(newUser, function(error) {
          if (error) {
            console.log('Error:', error);
          } else {
            console.log('New user created');
          }
        });
      });
    }


    return;


  },
  userDeleted: (event, admin) => {

    const user = event.data; // The Firebase user.
    const uid = user.uid; // The display name of the user.

    let usersRef=admin.database().ref("/users");
    return usersRef.child(uid).remove();

  },

};
