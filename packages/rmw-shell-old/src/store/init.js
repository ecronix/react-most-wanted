import { isAuthorised } from '../utils/auth'

export const initState = {
  auth: { isAuthorised: isAuthorised() }
}

export default initState
