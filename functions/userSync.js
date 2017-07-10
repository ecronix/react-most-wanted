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
  syncPublicChats: (event, admin) => {

    // Only edit data when it is edited.
    if (!event.data.previous.exists()) {
      return;
    }

    const eventSnapshot=event.data;

    //Sync only if displayName and photoURL changed
    if(!eventSnapshot.child('displayName').changed() && !eventSnapshot.child('photoURL').changed()){
      return;
    }


    let tasksRef=admin.database().ref("/public_chats");

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
          console.log('Public chat synced with user successfully!');
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
  populateUserRegistrationChartsPerDay: (event, admin) => {

    const year=event.data.metadata.createdAt.toISOString().slice(0, 4);
    const month=event.data.metadata.createdAt.toISOString().slice(5, 7);
    const day=event.data.metadata.createdAt.toISOString().slice(8, 10);
    const dayCountRef = admin.database().ref(`/user_registrations_per_day/${year}/${month}/${day}`);

    return dayCountRef.transaction(current => {
        return (current || 0) + 1;
    }).then(() => {
      console.log(`User registration counter per day updated.`);
    });

  },
  populateUserRegistrationChartsPerMonth: (event, admin) => {

    const year=event.data.metadata.createdAt.toISOString().slice(0, 4);
    const month=event.data.metadata.createdAt.toISOString().slice(5, 7);
    const dayCountRef = admin.database().ref(`/user_registrations_per_month/${year}/${month}`);

    return dayCountRef.transaction(current => {
        return (current || 0) + 1;
    }).then(() => {
      console.log(`User registration counter per month updated.`);
    });

  },


  userDeleted: (event, admin) => {

    const user = event.data; // The Firebase user.
    const uid = user.uid; // The display name of the user.

    let usersRef=admin.database().ref("/users");
    return usersRef.child(uid).remove();

  },

};
