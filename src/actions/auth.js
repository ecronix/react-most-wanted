export const UPDATE_AUTH = 'UPDATE_AUTH';

export function updateAuth(auth) {
  return {
    type: UPDATE_AUTH,
    auth
  };
}
