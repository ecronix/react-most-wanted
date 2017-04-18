import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ListItem from 'material-ui/List/ListItem';
import List from 'material-ui/List/List';
import Paper from 'material-ui/Paper';
import {ReduxIcon} from '../Icons';
import {injectIntl} from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';

const DrawerHeader = ({muiTheme, intl, auth, setAuthMenuOpen}) => {

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

      {auth.isSignedIn&&
        <List>
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar
                size={45}
                icon={auth.img===undefined?<FontIcon className="material-icons" >account_circle</FontIcon>:undefined}
                src={auth.img}
              />
            }
          />
          <ListItem
            disabled={true}
            primaryText={auth.name}
            secondaryText={auth.email}
            rightIconButton={
              <IconButton
                onTouchTap={()=>{setAuthMenuOpen(!auth.isMenuOpen)}}
                touch={true}>
                <FontIcon className="material-icons" >{auth.isMenuOpen?'expand_less':'expand_more'}</FontIcon>
              </IconButton>
            }

          />
        </List>
      }

      {!auth.isSignedIn&&

        <List>
          <ListItem
            disabled={true}
            primaryText={intl.formatMessage({id: 'app_name'})}
            leftAvatar={
              <ReduxIcon color={muiTheme.palette.accent1Color} style={styles.icon}/>
            }
          />
        </List>

      }
    </Paper>
  );

}

export const DrawerHeaderTest=injectIntl(muiThemeable()(DrawerHeader));

export default injectIntl(muiThemeable()(DrawerHeader));
