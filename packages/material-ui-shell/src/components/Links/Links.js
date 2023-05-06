import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {
  Home as HomeIcon,
  DashboardTwoToneIcon as DashboardTwoToneIcon,
  CollectionsTwoToneIcon as CollectionsTwoToneIcon,
  InfoTwoToneIcon as InfoTwoToneIcon,
  ChatTwoToneIcon as ChatTwoToneIcon,
  DvrTwoToneIcon as DvrTwoToneIcon,
  WhatshotTwoToneIcon as WhatshotTwoToneIcon,
  PhoneIcon as PhoneIcon,
} from '@mui/icons-material'

export default function Links() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', paddingTop: 1, textDecoration: 'none', color: '#1A2027dd', fontSize: '30px', alignItems: 'center' }}>
      <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          
        </ListItemAvatar>
        <ListItemText primary="Links" />
      </ListItem>
      <Divider />
      <a href="/Home"
        style={{
          textDecoration: 'none',
          color: '#1A2027dd',
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
            border: '1px solid #1A202733',
            '&:hover': {
              backgroundColor: '#1A2027'
            },
          }}>
          <ListItemAvatar>
            <HomeIcon />
          </ListItemAvatar>
          <ListItemText primary="Home" />
        </ListItem>
      </a>
      <a href="/Dashboard" style={{ textDecoration: 'none', color: '#1A2027dd' }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1A202733',
            '&:hover': {
              backgroundColor: '#1A202733'
            },
          }}>
          <ListItemAvatar>
            <DashboardTwoToneIcon />
          </ListItemAvatar>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </a> 
      <a href="/Gallery" style={{ textDecoration: 'none', color: '#1A2027dd' }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1A202733',
            '&:hover': {
              backgroundColor: '#1A202733'
            },
          }}>
          <ListItemAvatar>
            <CollectionsTwoToneIcon />
          </ListItemAvatar>
          <ListItemText primary="Gallery" />
        </ListItem>
      </a>
      <a href="/About" style={{ textDecoration: 'none', color: '#1A2027dd' }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1A202733',
            '&:hover': {
              backgroundColor: '#1A202733'
            },
          }}>
          <ListItemAvatar>
            <InfoTwoToneIcon />
          </ListItemAvatar>
          <ListItemText primary="About" />
        </ListItem>
      </a>
      <a href="/Chats" style={{ textDecoration: 'none', color: '#1A2027dd' }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1A202733',
            '&:hover': {
              backgroundColor: '#1A202733'
            },
          }}>
          <ListItemAvatar>
            <ChatTwoToneIcon />
          </ListItemAvatar>
          <ListItemText primary="Chats" />
        </ListItem>
      </a>
      <a href="/Demos" style={{ textDecoration: 'none', color: '#1A2027dd' }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1A202733',
            '&:hover': {
              backgroundColor: '#1A202733'
            },
          }}>
          <ListItemAvatar>
            <DvrTwoToneIcon />
          </ListItemAvatar>
          <ListItemText primary="Demos" />
        </ListItem>
      </a>
      <a href="/Firebase" style={{ textDecoration: 'none', color: '#1A2027dd' }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1A202733',
            '&:hover': {
              backgroundColor: '#1A202733'
            },
          }}>
          <ListItemAvatar>
            <WhatshotTwoToneIcon />
          </ListItemAvatar>
          <ListItemText primary="Firebase" />
        </ListItem>
      </a>
      <a href="/Contact" style={{ textDecoration: 'none', color: '#1A2027dd' }}>
        <ListItem
          alignItems="flex-start"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            borderRadius: '10px', 
            border: '1px solid #1A202733',
            '&:hover': {
              backgroundColor: '#1A202733'
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