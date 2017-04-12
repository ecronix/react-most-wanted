import{ UPDATE_AUTH } from '../actions/auth';

const auth = (state = null, action) => {

  switch (action.type) {
    case UPDATE_AUTH:
    return action.auth;

    default:
    return state;
  }
}

export default auth;
