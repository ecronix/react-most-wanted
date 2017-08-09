
export const grants = [
  'create_company',
  'edit_company',
  'delete_company',
  'read_companies',
]

export default function isGranted(state, grant) {

  const { auth, lists, paths } = state

  const userGrants=lists[`user_grants/${auth.uid}`];
  const isAdmin=paths[`admins/${auth.uid}`];

  if(auth.isAuthorised!==true){
    return false;
  }

  if(isAdmin===true){
    return true;
  }

  if(userGrants!==undefined){
    for (let userGrant of userGrants) {
      if(userGrant.key===grant){
        return userGrant.val===true;
      }
    }
  }

  return false;
}

export function isAnyGranted(state, grants){

  if(grants!==undefined){
    for (let grant of grants) {

      if(isGranted(state, grant)===true){
        return true;
      }
    }

  }

  return false;
}
