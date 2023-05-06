import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import CollectionsTwoToneIcon from '@mui/icons-material/CollectionsTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import DvrTwoToneIcon from '@mui/icons-material/DvrTwoTone';
import WhatshotTwoToneIcon from '@mui/icons-material/WhatshotTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f1f1f1',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const LandingPage = () => {
  return (
    <Box sx={{ flexGrow: 1, position: 'relative', display: 'flex', flexDirection: 'column', margin: 15, padding: 5, marginTop: 5, textDecoration: 'none' }}>
      <h1 style={{ fontSize: '3.5rem', marginTop: -40, marginBottom: 60, textAlign: 'center', color: 'rgba(0,0,0,0.8)' }}>Welcome to React-Most-Wanted</h1>
      <Grid container spacing={1}>
        <a href="/home">
        <Grid style={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          marginTop: 20
        }}>
            <Paper
            elevation={6}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                m: 1,
                width: 285,
                height: 300,
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: '#1A2027',
              color: '#f1f1f1'
            }}>Home Page</Item>
            <HomeTwoToneIcon
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem'
              }}
            />
            </Paper>
          </Grid>
        </a>
        <a href="/Dashboard">
        <Grid style={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          marginTop: 20
        }}>
            <Paper
            elevation={6}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                m: 1,
                width: 285,
                height: 300,
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: '#1A2027',
              color: '#f1f1f1'
            }}>Dashboard</Item>
            <DashboardTwoToneIcon
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem'
              }}
            />
            </Paper>
          </Grid>
        </a>
        <a href="/Gallery">
        <Grid style={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          marginTop: 20
        }}>
            <Paper
            elevation={6}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                m: 1,
                width: 285,
                height: 300,
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: '#1A2027',
              color: '#f1f1f1'
            }}>Gallery</Item>
            <CollectionsTwoToneIcon
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem'
              }}
            />
            </Paper>
          </Grid>
        </a>
        <a href="/About">
        <Grid style={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          marginTop: 20
        }}>
            <Paper
            elevation={6}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                m: 1,
                width: 285,
                height: 300,
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: '#1A2027',
              color: '#f1f1f1'
            }}>About</Item>
            <InfoTwoToneIcon
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem'
              }}
            />
            </Paper>
          </Grid>
        </a>
        <a href="/Chats">
        <Grid style={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          marginTop: 20
        }}>
            <Paper
            elevation={6}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                m: 1,
                width: 285,
                height: 300,
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: '#1A2027',
              color: '#f1f1f1'
            }}>Chats</Item>
            <ChatTwoToneIcon
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem'
              }}
            />
            </Paper>
          </Grid>
        </a>
        <a href="/Demos">
        <Grid style={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          marginTop: 20
        }}>
            <Paper
            elevation={6}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                m: 1,
                width: 285,
                height: 300,
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: '#1A2027',
              color: '#f1f1f1'
            }}>Demos</Item>
            <DvrTwoToneIcon
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem'
              }}
            />
            </Paper>
          </Grid>
        </a>
        <a href="/Firebase">
        <Grid style={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          marginTop: 20
        }}>
            <Paper
            elevation={6}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                m: 1,
                width: 285,
                height: 300,
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: '#1A2027',
              color: '#f1f1f1'
            }}>Firebase</Item>
            <WhatshotTwoToneIcon
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem'
              }}
            />
            </Paper>
          </Grid>
        </a>
        <a href="/Signin">
        <Grid style={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          marginTop: 20
        }}>
            <Paper
            elevation={6}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                m: 1,
                width: 285,
                height: 300,
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: '#1A2027',
              color: '#f1f1f1'
            }}>Sign Up / Sign In</Item>
            <AccountCircleTwoToneIcon
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem',
              }}
            />
            </Paper>
          </Grid>
        </a>
      </Grid>
    </Box>
  )
}
export default LandingPage
