import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ListItem from 'material-ui/List/ListItem';
import List from 'material-ui/List/List';
import Paper from 'material-ui/Paper';
import {RMWIcon} from '../Icons';
import {injectIntl} from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';

const DrawerHeader = ({muiTheme, intl, auth, setAuthMenuOpen, fetchUser, dialogs, setDialogIsOpen}) => {
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
    <Paper zDepth={1} style={styles.paper}>
      {auth.isAuthorised  &&
        <div>
            <List>
              <ListItem
                disabled={true}
                leftAvatar={
                  <Avatar size={45} src={auth.photoURL} alt="person" icon={<FontIcon className="material-icons" >person</FontIcon>} />
                }
              />

              <ListItem
                primaryText={auth.displayName}
                secondaryText={auth.email}
                rightIconButton={
                  <IconButton onClick={()=>{setDialogIsOpen('auth_menu', dialogs.auth_menu?false:true)}}>
                    <FontIcon className="material-icons" >{dialogs.auth_menu?'arrow_drop_up': 'arrow_drop_down'}</FontIcon>
                  </IconButton>
                }
                disableFocusRipple={true}
                style={{ backgroundColor: 'transparent' }}
                onClick={()=>{setDialogIsOpen('auth_menu', dialogs.auth_menu?false:true)}}
              />
            </List>
        </div>
      }

      {!auth.isAuthorised &&
        <List>
          <ListItem
            disabled={true}
            primaryText={intl.formatMessage({id: 'app_name'})}
            leftAvatar={
              <RMWIcon color={muiTheme.palette.accent1Color} style={styles.icon}/>
            }
          />
        </List>

      }
    </Paper>
  );
}

export default injectIntl(muiThemeable()(DrawerHeader));
