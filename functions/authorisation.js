module.exports = {
  handleRoleGrantChange: (event, admin) => {
    const roleUid = event.params.roleUid;
    const grantUid = event.params.grantUid;
    const eventSnapshot=event.data;

    const userRolesRef=admin.database().ref(`user_roles`);

    return userRolesRef.once('value')
    .then((snapshot) =>{


      let promises=[];

      snapshot.forEach(userRoles=>{

        const userUid=userRoles.key;
        const roles=userRoles.val();

        Object.keys(roles).forEach((key, index)=>{
          if(key===roleUid){


            let grantRef=false;

            console.log('User role changed:', eventSnapshot.val());

            if(eventSnapshot.val()){
              grantRef=admin.database().ref(`user_grants/${userUid}/${grantUid}`).set(true).then(()=>{
                console.log('Grant added:', grantUid);
                return;
              });


            }else{

              grantRef=admin.database().ref(`user_grants/${userUid}/${grantUid}`).remove().then(()=>{
                console.log('Grant removed:', grantUid);
                return;
              });

            }

            promises.push(grantRef);

            console.log('Role changed', userUid, roleUid, grantUid);
          }
        })


      });

      return Promise.all(promises);

    });

    return;
  },
  hanldeUserRoleChange: (event, admin) => {

    const userUid = event.params.userUid;
    const roleUid = event.params.roleUid;
    const eventSnapshot=event.data;

    const roleRef=admin.database().ref(`roles/${roleUid}`);
    const roleGrantsRef=admin.database().ref(`role_grants/${roleUid}`);
    const userGrantsRef=admin.database().ref(`user_grants/${userUid}`);

    return roleGrantsRef.once('value')
    .then((snapshot) =>{

      let promises=[];

      snapshot.forEach(grant=>{

        let grantRef=false;

        console.log('User role changed:', eventSnapshot.val());

        if(eventSnapshot.val()){
          grantRef=admin.database().ref(`user_grants/${userUid}/${grant.key}`).set(true).then(()=>{
            console.log('Grant added:', grant.key);
            return;
          });


        }else{

          grantRef=admin.database().ref(`user_grants/${userUid}/${grant.key}`).remove().then(()=>{
            console.log('Grant removed:', grant.key);
            return;
          });

        }

        promises.push(grantRef);

      })


      return Promise.all(promises);

    })

    return;

  },
  handleRoleChange: (event, admin) => {

    // Exit when the data is not deleted.
    if (event.data.exists()) {
      return;
    }

    const roleUid = event.params.roleUid;

    return grantRef=admin.database().ref(`role_grants/${roleUid}`).remove();

  }
};
