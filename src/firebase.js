import firebase from 'firebase'
import config from './config'
// eslint-disable-next-line
//import firestore from 'firebase/firestore'

export const firebaseApp = firebase.initializeApp(process.env.NODE_ENV !== 'production' ? config.firebase_config_dev : config.firebase_config)
export const firebaseAuth = firebaseApp.auth()
export const firebaseDb = firebaseApp.database()
export default firebaseApp
