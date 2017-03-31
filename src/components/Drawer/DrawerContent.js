import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {SelectableMenuList} from 'material-ui-selectable-menu-list';
import FontIcon from 'material-ui/FontIcon';

const DrawerContent = (props) => {

  const { location }=props;

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
