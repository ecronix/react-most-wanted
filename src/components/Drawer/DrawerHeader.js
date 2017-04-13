import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import ListItem from 'material-ui/List/ListItem';
import List from 'material-ui/List/List';
import Paper from 'material-ui/Paper';
import {ReduxIcon} from '../Icons';

const DrawerHeader = ({muiTheme, intl, auth, updateAuth}) => {

  const styles={
    header:{
      padding: 5,
    },
    header_content:{
      padding: 5,
    },
    paper:{
      backgroundColor:muiTheme.palette.primary2Color,
      color: muiTheme.palette.alternateTextColor,
      margin:0,
      padding: 0
    },
    icon: {
      width:48,
      height: 48,
      top: 4
    }
  }

  return (
    <Paper  zDepth={1} style={styles.paper}>

      {auth&&

        <List>
          <ListItem
            disabled={true}
            primaryText={auth.name}
            secondaryText={auth.email}
            leftAvatar={
              <Avatar
                src={auth.img}
              />
            }
            rightIconButton={
              <IconMenu
                iconButtonElement={
                  <IconButton touch={true}>
                    <NavigationExpandMoreIcon />
                  </IconButton>
                }>
                <MenuItem
                  primaryText={intl.formatMessage({id: 'sign_out'})}
                  secondaryTextLines={2}
                  onTouchTap={()=>{updateAuth(null)}}
                />
              </IconMenu>
            }
          />
        </List>

      }

      {!auth&&

        <List>
          <ListItem
            disabled={true}
            primaryText={intl.formatMessage({id: 'app_name'})}
            //secondaryText={auth.email}
            leftAvatar={
              <ReduxIcon color={muiTheme.palette.accent1Color} style={styles.icon}/>
            }
          />
        </List>

      }
    </Paper>
  );



}


export default DrawerHeader;
