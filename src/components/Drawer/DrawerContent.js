import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {SelectableMenuList} from 'material-ui-selectable-menu-list';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';
import allThemes from '../../themes';
import allLocales from '../../locales';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

const DrawerContent = (props, context) => {

  const {
    responsiveDrawer,
    setResponsive,
    theme,
    locale,
    updateTheme,
    updateLocale,
    intl,
    muiTheme,
    auth,
    dialogs,
    match,
    messaging,
    isGranted
  }=props;

  const isAuthorised = auth.isAuthorised;

  const handleChange = (event, index) => {
    const {history, responsiveDrawer, setDrawerOpen} = props;

    if(responsiveDrawer.open && index!==undefined){
      setDrawerOpen(false);
    }

    if(index!==undefined && index!==Object(index)){
      history.push(index);
    }
  };

  const themeItems = allThemes.map((t)=>{
    return {
      value:undefined,
      visible: true,
      primaryText: intl.formatMessage({id: t.id}),
      onClick: ()=>{updateTheme(t.id)},
      rightIcon: <FontIcon
        className="material-icons"
        color={t.id===theme?muiTheme.palette.primary1Color:undefined}>
        style
      </FontIcon>
    }
  });

  const localeItems=allLocales.map((l)=>{

    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({id: l.locale}) ,
      onClick: ()=>{updateLocale(l.locale)},
      rightIcon: <FontIcon
        className="material-icons"
        color={l.locale===locale?muiTheme.palette.primary1Color:undefined}>
        language
      </FontIcon>
    }
  });


  const menuItems=[
    {
      value:'/dashboard',
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'dashboard'}),
      leftIcon: <FontIcon className="material-icons" >dashboard</FontIcon>
    },
    {
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'chats'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >chats</FontIcon>,
      nestedItems:[
        {
          value:'/chats',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'private'}),
          leftIcon: <FontIcon className="material-icons" >person</FontIcon>
        },
        {
          value:'/public_chats',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'public'}),
          leftIcon: <FontIcon className="material-icons" >group</FontIcon>
        },
        {
          value:'/predefined_chat_messages',
          visible: isAuthorised,
          primaryText: intl.formatMessage({id: 'predefined_messages'}),
          leftIcon: <FontIcon className="material-icons" >textsms</FontIcon>
        }
      ]
    },
    {
      value:'/companies',
      visible: isGranted('read_companies'),
      primaryText: intl.formatMessage({id: 'companies'}),
      leftIcon: <FontIcon className="material-icons" >business</FontIcon>
    },
    {
      value:'/tasks',
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'tasks'}),
      leftIcon: <FontIcon className="material-icons" >list</FontIcon>
    },
    {
      visible: isAuthorised,
      primaryTogglesNestedList: true,
      primaryText: intl.formatMessage({id: 'firestore'}),
      leftIcon: <FontIcon className="material-icons" >flash_on</FontIcon>,
      nestedItems:[
        {
          value: '/document',
          primaryText: intl.formatMessage({id: 'document'}),
          leftIcon: <FontIcon className="material-icons" >flash_on</FontIcon>,
        },
        {
          value: '/collection',
          primaryText: intl.formatMessage({id: 'collection'}),
          leftIcon: <FontIcon className="material-icons" >flash_on</FontIcon>,
        }
      ]
    },
    {
      value:'/about',
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'about'}),
      leftIcon: <FontIcon className="material-icons" >info_outline</FontIcon>
    },
    {
      visible: isAuthorised, //In prod: isGranted('administration'),
      primaryTogglesNestedList: true,
      primaryText: intl.formatMessage({id: 'administration'}),
      leftIcon: <FontIcon className="material-icons" >security</FontIcon>,
      nestedItems:[
        {
          value:'/users',
          visible: isAuthorised, //In prod: isGranted('read_users'),
          primaryText: intl.formatMessage({id: 'users'}),
          leftIcon: <FontIcon className="material-icons" >group</FontIcon>
        },
        {
          value:'/roles',
          visible: isGranted('read_roles'),
          primaryText: intl.formatMessage({id: 'roles'}),
          leftIcon: <FontIcon className="material-icons" >account_box</FontIcon>
        },
      ]
    },
    {
      divider:true,
      visible: isAuthorised,
    },
    {
      primaryText: intl.formatMessage({id: 'settings'}),
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >settings</FontIcon>,
      nestedItems:[
        {
          primaryText: intl.formatMessage({id: 'theme'}),
          secondaryText: intl.formatMessage({id: theme}),
          primaryTogglesNestedList: true,
          leftIcon: <FontIcon className="material-icons" >style</FontIcon>,
          nestedItems: themeItems,
        },
        {
          primaryText: intl.formatMessage({id: 'language'}),
          secondaryText: intl.formatMessage({id: locale}),
          primaryTogglesNestedList: true,
          leftIcon: <FontIcon className="material-icons" >language</FontIcon>,
          nestedItems: localeItems,
        },
        {
          primaryText: intl.formatMessage({id: 'responsive'}),
          leftIcon: <FontIcon className="material-icons" >chrome_reader_mode</FontIcon>,
          rightToggle: <Toggle
            toggled={responsiveDrawer.responsive}
            onToggle={
              () => {setResponsive(!responsiveDrawer.responsive)}
            }
          />,
        },
      ]
    },
  ];

  const handleSignOut = () =>{
    const { userLogout, setDialogIsOpen } = props;

    import('../../firebase').then(({firebaseApp}) => {
      this.firebaseApp=firebaseApp

      firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/connections`).remove();
      firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/notificationTokens/${messaging.token}`).remove();
      firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/lastOnline`).set(new Date());
      firebaseApp.auth().signOut().then(()=>{setDialogIsOpen('auth_menu', false);});
      userLogout();

    })

  };

  const authItems=[
    {
      value:'/my_account',
      primaryText: intl.formatMessage({id: 'my_account'}),
      leftIcon: <FontIcon className="material-icons" >account_box</FontIcon>
    },
    {
      value:'/signin',
      onClick: handleSignOut,
      primaryText: intl.formatMessage({id: 'sign_out'}),
      leftIcon: <FontIcon className="material-icons" >lock</FontIcon>
    },

  ];


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
    <SelectableMenuList
      items={dialogs.auth_menu?authItems:menuItems}
      onIndexChange={handleChange}
      index={match?match.path:'/'}
    />

  </div>

);
}

export default injectIntl(muiThemeable()(withRouter(DrawerContent)));
