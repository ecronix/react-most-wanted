import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {
  Home as HomeIcon,
  Newspaper as NewspaperIcon,
  Scoreboard as ScoreboardIcon,
  Collections as CollectionsIcon,
  Article as ArticleIcon,
  Phone as PhoneIcon,
  Navigation as NavigationIcon,
  Info as InfoIcon,
} from '@mui/icons-material'

export default function Links() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', paddingTop: 1, textDecoration: 'none', color: '#1a1a1add', fontSize: '30px', alignItems: 'center' }}>
      <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          
        </ListItemAvatar>
        <ListItemText primary="Links" />
      </ListItem>
      <Divider />
      <a href="/Home"
        style={{
          textDecoration: 'none',
          color: '#1a1a1add',
        }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1a1a1a33',
            '&:hover': {
              backgroundColor: '#9affa3'
            },
          }}>
          <ListItemAvatar>
            <HomeIcon />
          </ListItemAvatar>
          <ListItemText primary="Home" />
        </ListItem>
      </a>
      <a href="/News" style={{ textDecoration: 'none', color: '#1a1a1add' }}>
        <ListItem
                  alignItems="flex-start"
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                    paddingTop: 1,
                    paddingBottom: 1,
                    alignItems: 'center',
                    borderRadius: '10px', 
                    border: '1px solid #1a1a1a33',
                    '&:hover': {
                      backgroundColor: '#9affa3'
                    },
                  }}>          <ListItemAvatar>
                    <NewspaperIcon />
                  </ListItemAvatar>
                  <ListItemText primary="News" />
                </ListItem>
              </a> 
              <a href="/Cardings" style={{ textDecoration: 'none', color: '#1a1a1add' }}>
        <ListItem
                  alignItems="flex-start"
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                    paddingTop: 1,
                    paddingBottom: 1,
                    alignItems: 'center',
                    borderRadius: '10px', 
                    border: '1px solid #1a1a1a33',
                    '&:hover': {
                      backgroundColor: '#9affa3'
                    },
                  }}>          <ListItemAvatar>
            <ScoreboardIcon />
          </ListItemAvatar>
          <ListItemText primary="Cardings" />
        </ListItem>
      </a>
      <a href="/Gallery" style={{ textDecoration: 'none', color: '#1a1a1add' }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1a1a1a33',
            '&:hover': {
              backgroundColor: '#9affa3'
            },
          }}>
          <ListItemAvatar>
            <CollectionsIcon />
          </ListItemAvatar>
          <ListItemText primary="Gallery" />
        </ListItem>
      </a>
      <a href="/Constitution" style={{ textDecoration: 'none', color: '#1a1a1add' }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1a1a1a33',
            '&:hover': {
              backgroundColor: '#9affa3'
            },
          }}>
          <ListItemAvatar>
            <ArticleIcon />
          </ListItemAvatar>
          <ListItemText primary="Constitution" />
        </ListItem>
      </a>
      <a href="/Directions" style={{ textDecoration: 'none', color: '#1a1a1add' }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1a1a1a33',
            '&:hover': {
              backgroundColor: '#9affa3'
            },
          }}>
          <ListItemAvatar>
            <NavigationIcon />
          </ListItemAvatar>
          <ListItemText primary="Directions" />
        </ListItem>
      </a>
      <a href="/Popia" style={{ textDecoration: 'none', color: '#1a1a1add' }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1a1a1a33',
            '&:hover': {
              backgroundColor: '#9affa3'
            },
          }}>
          <ListItemAvatar>
            <InfoIcon />
          </ListItemAvatar>
          <ListItemText primary="Popia Notice" />
        </ListItem>
      </a>
      <a href="/Contact" style={{ textDecoration: 'none', color: '#1a1a1add' }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1a1a1a33',
            '&:hover': {
              backgroundColor: '#9affa3'
            },
          }}>
          <ListItemAvatar>
            <PhoneIcon />
          </ListItemAvatar>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </a>
    </List>
  );
}