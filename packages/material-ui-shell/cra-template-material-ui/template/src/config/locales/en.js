import { defineMessages } from 'react-intl'

const messages = defineMessages({
  app_name: 'React Most Wanted',
  sign_in: 'Sign in',
  sign_out: 'Sign out',
  sign_up: 'Sign up',
  email: 'Email',
  username: 'Username',
  // deepcode ignore NoHardcodedPasswords: intended
  password: 'Password',
  about: 'About',
  home: 'Home',
  page_not_found: 'Page not found',
  settings: 'Settings',
  theme: 'Theme',
  default: 'Default',
  red: 'Red',
  green: 'Green',
  language: 'Language',
  en: 'English',
  de: 'German',
  ru: 'Russian',
  menu: 'Menu',
  menu_mini_mode: 'Mini menu',
  offline: 'Offline',
  demos: 'Demos',
  dialog_demo: 'Demo dialog',
  dialog_title: 'Dialog title',
  dialog_action: 'YES, Delete',
  dialog_message: `Dialog message. You can put as much text as you want here. 
  Ask a question or show a warning before deleting something. 
  You can also set the action text to something like "YES, Delete" and run that action by passing a "handleAction" prop. 
  This receives a "handleClose" callback with which you can close the dialog when your action is done.`,
  toast_demo: 'Demo toast',
  filter_demo: 'Demo filter',
  list_page_demo: 'List Page demo with {count} rows',
  forgot_password: 'Forgot password',
  password_reset: 'Password reset',
  password_confirm: 'Password confirm',
  registration: 'Registration',
  my_account: 'My account',
  delete_account_dialog_title: 'Delete Account?',
  delete_account_dialog_message:
    'Your account will be deleted and you will lose all your data!',
  delete_account_dialog_action: 'Delete account',
})

export default messages
