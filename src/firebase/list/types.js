
export default function getTypes(listName){

  const namespace=listName.toUpperCase();

  return {
    ERROR: `${namespace}@ERROR`,
    FETCH: `${namespace}@FETCH`,
    DELETE: `${namespace}@DELETE`,
    CREATE: `${namespace}@CREATE`,
    EDIT: `${namespace}@EDIT`,
    CREATE_SUCCESS: `${namespace}@CREATE_SUCCESS`,
    DELETE_SUCCESS: `${namespace}@DELETE_SUCCESS`,
    UPDATE_SUCCESS: `${namespace}@UPDATE_SUCCESS`,
    LOAD_SUCCESS: `${namespace}@LOAD_SUCCESS`,
    UNLOAD_SUCCESS: `${namespace}@UNLOAD_SUCCESS`,
  }
}
