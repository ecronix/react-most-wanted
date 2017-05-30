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
import CircularProgress from 'material-ui/CircularProgress';

const DrawerHeader = ({muiTheme, intl, auth, setAuthMenuOpen, fetchUser}) => {

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

      {auth.isAuthorised&&
        <div>

          {auth.isFetching && <CircularProgress size={80} thickness={5} />}

          {!auth.isFetching &&

            <List>
              <ListItem
                disabled={true}
                leftAvatar={
                  <Avatar
                    size={45}
                    src={auth.photoURL}
                    alt="person"
                    icon={<FontIcon className="material-icons" >person</FontIcon>}
                  />
                }
              />
              <ListItem
                disabled={true}
                primaryText={auth.displayName}
                secondaryText={auth.email}
                rightIconButton={
                  <IconButton
                    onTouchTap={()=>{setAuthMenuOpen(!auth.isMenuOpen)}}
                    touch={true}>
                    <FontIcon className="material-icons" >{auth.isMenuOpen?'arrow_drop_up':'arrow_drop_down'}</FontIcon>
                  </IconButton>
                }

              />
            </List>
          }
        </div>
      }

      {!auth.isAuthorised&&

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
