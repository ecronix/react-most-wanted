import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {SelectableMenuList} from 'material-ui-selectable-menu-list';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';
import themes from '../../themes';

const DrawerContent = (props) => {

  const { location, responsiveDrawer, setResponsive, theming, setCurrentTheme }=props;


  const handleChange = (event, index) => {
    const {push, responsiveDrawer} = props;

    //console.debug('event', event);

    if(responsiveDrawer.open && index!==undefined){
      //setDrawerOpen(false);
    }

    if(index!==undefined && index!==Object(index)){
      console.debug('index', index);
      push(index);
    }
  };

  const themeItems=themes.map((theme)=>{
    return {
      value:undefined,
      visible: true,
      primaryText: theme.label,
      onTouchTap: ()=>{setCurrentTheme(theme)},
      //leftIcon: <FontIcon className="material-icons" >style</FontIcon>
    }
  });

  const menuItems=[
    {
      value:'/drawer_controls',
      visible: true,
      primaryText: 'Drawer Controls',
      leftIcon: <FontIcon className="material-icons" >dashboard</FontIcon>
    },
    {
      value:'/test1',
      visible: true,
      primaryText: 'test',
      leftIcon: <FontIcon className="material-icons" >dashboard</FontIcon>
    },
    {
      value:'/test2',
      visible: true,
      primaryText: 'test2',
      leftIcon: <FontIcon className="material-icons" >transfer_within_a_station</FontIcon>
    },
    {
      divider:true,
    },
    {
      primaryText: 'Settings',
      primaryTogglesNestedList: true,
      leftIcon: <FontIcon className="material-icons" >settings</FontIcon>,
      nestedItems:[
        {
          primaryText: 'Theme',
          secondaryText: theming.label,
          leftIcon: <FontIcon className="material-icons" >style</FontIcon>,
          nestedItems: themeItems,
          //onClick: ()=>{setThemeDialogOpen(true)},
        },
        {
          primaryText: 'Language',
          secondaryText: 'default',
          leftIcon: <FontIcon className="material-icons" >language</FontIcon>,
          //onClick: ()=>{setIntlDialogOpen(true)},
        },
        {
          primaryText: 'Responsive',
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

  return (
    <div>
      <SelectableMenuList
        items={menuItems}
        onIndexChange={handleChange}
        index={location?location.pathname:'/'}
      />
    </div>
  );
}

export default muiThemeable()(DrawerContent);
