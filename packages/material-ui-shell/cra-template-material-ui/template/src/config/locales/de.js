import { defineMessages } from 'react-intl'

const messages = defineMessages({
  app_name: 'React Meist Gesucht',
  sign_in: 'Anmelden',
  sign_out: 'Abmelden',
  sign_up: 'Anmeldung',
  email: 'Email',
  username: 'Nutzername',
  // deepcode ignore NoHardcodedPasswords: intended
  password: 'Passwort',
  about: 'Über',
  home: 'Startseite',
  page_not_found: 'Seite nicht gefunden',
  settings: 'Einstellungen',
  theme: 'Thema',
  default: 'Standard',
  red: 'Rot',
  green: 'Grün',
  language: 'Sprache',
  en: 'Englisch',
  de: 'Deutsch',
  ru: 'Russisch',
  menu: 'Menü',
  menu_mini_mode: 'Mini-Menü',
  offline: 'Offline',
  demos: 'Demos',
  dialog_demo: 'Demo Dialog',
  dialog_title: 'Dialog titel',
  dialog_action: 'JA, Löschen',
  dialog_message: `Dialognachricht. Sie können hier so viel Text einfügen, wie Sie möchten. 
  Stellen Sie eine Frage oder zeigen Sie eine Warnung an, bevor Sie etwas löschen. 
  Sie können den Aktionstext auch auf "JA, Löschen" setzen und diese Aktion ausführen, indem Sie eine "handleAction" -Stütze übergeben. 
  Dies erhält einen "handleClose" -Rückruf, mit dem Sie den Dialog schließen können, wenn Ihre Aktion abgeschlossen ist.`,
  toast_demo: 'Demo Toast',
  filter_demo: 'Demo filter',
  list_page_demo: 'List Page Demo mit {count} Zeilen',
  forgot_password: 'Passwort vergessen',
  password_reset: 'Passwort zurücksetzen',
  password_confirm: 'Passwortbestätigung',
  registration: 'Registrierung',
  my_account: 'Mein Konto',
  delete_account_dialog_title: 'Konto löschen?',
  delete_account_dialog_message:
    'Dein Konto wird gelöscht und mit ihm alle Daten!',
  delete_account_dialog_action: 'Konto löschen',
})

export default messages
