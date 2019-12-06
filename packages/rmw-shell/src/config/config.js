import configureStore from '../store'
import getMenuItems from './menuItems'
import grants from './grants'
import locales from './locales'
import { RMWIcon } from '../components/Icons'
import { themes } from './themes'

const config = {
  firebase_config: {
    apiKey: 'AIzaSyBQAmNJ2DbRyw8PqdmNWlePYtMP0hUcjpY',
    authDomain: 'react-most-wanted-3b1b2.firebaseapp.com',
    databaseURL: 'https://react-most-wanted-3b1b2.firebaseio.com',
    projectId: 'react-most-wanted-3b1b2',
    storageBucket: 'react-most-wanted-3b1b2.appspot.com',
    messagingSenderId: '258373383650'
  },
  firebase_config_dev: {
    apiKey: 'AIzaSyB31cMH9nJnERC1WCWA7lQHnY08voLs-Z0',
    authDomain: 'react-most-wanted-dev.firebaseapp.com',
    databaseURL: 'https://react-most-wanted-dev.firebaseio.com',
    projectId: 'react-most-wanted-dev',
    storageBucket: 'react-most-wanted-dev.appspot.com',
    messagingSenderId: '70650394824'
  },
  firebase_providers: ['google.com', 'facebook.com', 'twitter.com', 'github.com', 'password', 'phone'],
  initial_state: {
    theme: 'light',
    locale: 'en'
  },
  drawer_width: 240,
  appIcon: RMWIcon,
  configureStore,
  getMenuItems,
  locales,
  themes,
  grants,
  routes: [],
  onAuthStateChanged: undefined,
  notificationsReengagingHours: 48,
  firebaseLoad: () => import('./firebase'),
  getNotifications: (notification, props) => {
    const { history } = props
    return {
      chat: {
        path: 'chats',
        autoClose: 5000,
        //getNotification: () => <div>YOUR CUSTOM NOTIFICATION COMPONENT</div>,
        onClick: () => {
          history.push('/chats')
        },
        ...notification
      }
    }
  }
}

export default config
