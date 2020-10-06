import { defineMessages } from 'react-intl'

const messages = defineMessages({
  app_name: 'React Most Wanted',
  sign_in: 'Вход',
  sign_out: 'Выход',
  sign_up: 'Зарегистрироваться',
  email: 'Эл. адрес',
  username: 'Имя пользователя',
  password: 'Пароль',
  about: 'О нас',
  home: 'Главная',
  page_not_found: 'Страница не найдена',
  settings: 'Настройки',
  theme: 'Тема',
  default: 'По умолчанию',
  red: 'Красная',
  green: 'Зелёная',
  language: 'Язык',
  en: 'English',
  de: 'Deutsch',
  ru: 'Русский',
  menu: 'Меню',
  menu_mini_mode: 'Мини меню',
  offline: 'Офлайн',
  demos:'Демонстрации',
  dialog_demo:'Демонстрация диалога',
  dialog_title:'Заголовок диалога',
  dialog_action:'Да, удалить',
  dialog_message:`Диалоговое сообщение. Вы можете поместить сюда сколько угодно текста. 
  Задайте вопрос или покажите предупреждение перед удалением чего-либо. 
  Вы также можете задать для текста действия значение somerhing, например «Да, Удалить», и запустить это действие, передав опору «handleAction». 
  Он получает обратный вызов handleClose, с которым вы можете закрыть диалог, когда ваше действие будет выполнено.`,
  toast_demo:'Демонстрация toast',
  filter_demo:'Демонстрация фильтра',
  list_page_demo:'Демонстрация страницы списка с {count} строками',
  forgot_password:'Забыли пароль',
  password_reset:'Сброс пароля',
  password_confirm:'Подтвердить пароль',
  registration:'Регистрация',
})

export default messages
