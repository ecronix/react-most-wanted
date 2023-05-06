import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Home from '@mui/icons-material/Home';
import StadiumIcon from '@mui/icons-material/Stadium';
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import FaxTwoToneIcon from '@mui/icons-material/FaxTwoTone';


const data = [
  { icon: <MapTwoToneIcon />, label: '40 8th Avenue Northmead Benoni' },
  { icon: <DraftsTwoToneIcon />, label: 'PO Box 15570 Farrarmere 1518 Gauteng' },
  { icon: <LocalPhoneTwoToneIcon />, label: '+27 11 849 9919' },
  { icon: <FaxTwoToneIcon />, label: '+27 11 849 8595' },
];

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function CustomizedList() {
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgba(68, 201, 79, .98)' },
            background: { paper: 'rgba(5, 52, 15, .95)' },
          },
        })}
      >
        <Paper elevation={3} sx={{ maxWidth: 350 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="#customized-list">
              <StadiumIcon style={{ fontSize: 40 }} />
              <ListItemText
                sx={{ my: 0 }}
                primary="Northmead Bowling Club"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                  marginLeft: '20px'
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemIcon>
                  <Home color="white" />
                </ListItemIcon>
                <ListItemText
                  primary="Founded: 1938"
                  primaryTypographyProps={{
                    color: 'primary',
                    fontSize: 15,
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <Box
              sx={{
                bgcolor: open ? 'rgba(71, 130, 71, 0.2)' : null,
                pb: open ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                }}
              >
              </ListItemButton>
              {open &&
                data.map((item) => (
                  <ListItemButton
                    key={item.label}
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.9)' }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}