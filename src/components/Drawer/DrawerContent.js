import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {SelectableMenuList} from 'material-ui-selectable-menu-list';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';

const DrawerContent = (props) => {

  const { location, responsiveDrawer, setResponsive }=props;

  console.debug('location', location);

  const handleChange = (event, index) => {
    const {push, responsiveDrawer} = props;

    if(responsiveDrawer.open && index!==undefined){
      //setDrawerOpen(false);
    }

    if(index!==undefined && index!==Object(index)){
      push(index);
    }
  };

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
          secondaryText: 'default',
          leftIcon: <FontIcon className="material-icons" >style</FontIcon>,
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
