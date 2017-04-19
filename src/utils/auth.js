
export const isAuthorised = () => {
  const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));
  const data = JSON.parse(localStorage.getItem(key));
  return data != null;
}
