module.exports = {
  syncPublicTasks: (event, admin) => {

    // Only edit data when it is edited.
    if (!event.data.previous.exists()) {
      return;
    }

    let tasksRef=admin.database().ref("/public_tasks");

    var query = tasksRef.orderByChild("userId").equalTo(event.params.userUid);

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

  },
  userCreatedDefaults: (event, admin) => {

    const user = event.data; // The Firebase user.

    const email = user.email?user.email:'  '; // The email of the user.
    const displayName = user.displayName?user.displayName:'UserName'; // The display name of the user.
    const uid = user.uid; // The display name of the user.


    let usersRef=admin.database().ref("/users");
    let userRef=usersRef.child(uid);

    let newUser={
      displayName: displayName,
      email: email,
    }

    return userRef.update(newUser, function(error) {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('New user created');
      }
    });

  },
  userDeleted: (event, admin) => {

    const user = event.data; // The Firebase user.
    const uid = user.uid; // The display name of the user.

    let usersRef=admin.database().ref("/users");
    return usersRef.child(uid).remove();

  },

};
