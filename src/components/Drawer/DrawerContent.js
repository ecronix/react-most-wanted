import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {SelectableMenuList} from 'material-ui-selectable-menu-list';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';
import allThemes from '../../themes';
import allLocales from '../../locales';
import {injectIntl} from 'react-intl';

const DrawerContent = (props) => {

  const {
    router,
    responsiveDrawer,
    setResponsive,
    theme,
    locale,
    updateTheme,
    updateLocale,
    intl,
    muiTheme,
    auth,
    signOutUser,
    isAuthorised
  }=props;

  const handleChange = (event, index) => {
    const {push, responsiveDrawer, setDrawerOpen} = props;

    if(responsiveDrawer.open && index!==undefined){
      setDrawerOpen(false);
    }

    if(index!==undefined && index!==Object(index)){
      push(index);
    }
  };

  const themeItems = allThemes.map((t)=>{
    return {
      value:undefined,
      visible: true,
      primaryText: intl.formatMessage({id: t.id}),
      onTouchTap: ()=>{updateTheme(t.id)},
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
      onTouchTap: ()=>{updateLocale(l.locale)},
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
      value:'/about',
      visible: isAuthorised,
      primaryText: intl.formatMessage({id: 'about'}),
      leftIcon: <FontIcon className="material-icons" >info_outline</FontIcon>
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

  const handleSignOut=()=>{signOutUser()};

  const authItems=[
    {
      value:'/my_account',
      primaryText: intl.formatMessage({id: 'my_account'}),
      leftIcon: <FontIcon className="material-icons" >account_box</FontIcon>
    },
    {
      value:'/signin',
      onTouchTap: handleSignOut,
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
      items={auth.isMenuOpen?authItems:menuItems}
      onIndexChange={handleChange}
      index={router?router.location.pathname:'/'}
    />

  </div>

);
}

export default injectIntl(muiThemeable()(DrawerContent));
