import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NewspaperTwoToneIcon from '@mui/icons-material/NewspaperTwoTone';
import ScoreboardTwoToneIcon from '@mui/icons-material/ScoreboardTwoTone';
import CollectionsTwoToneIcon from '@mui/icons-material/CollectionsTwoTone';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import AssistantDirectionTwoToneIcon from '@mui/icons-material/AssistantDirectionTwoTone';
import AlternateEmailTwoToneIcon from '@mui/icons-material/AlternateEmailTwoTone';
import PrivacyTipTwoToneIcon from '@mui/icons-material/PrivacyTipTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const LandingPage = () => {
  return (
    <Box sx={{ flexGrow: 1, position: 'relative', display: 'flex', flexDirection: 'column', margin: 15, padding: 5, marginTop: 5, textDecoration: 'none' }}>
      <h1 style={{ fontSize: '3.5rem', marginTop: -40, marginBottom: 60, textAlign: 'center', color: 'rgba(0,0,0,0.8)' }}>Welcome to Northmead Bowling Club</h1>
      <Grid container spacing={1}>
        <a href="/News">
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
                backgroundColor: 'rgba(0,255,0,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: 'green',
              color: 'white'
            }}>News</Item>
            <NewspaperTwoToneIcon
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
        <a href="/Cardings">
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
                backgroundColor: 'rgba(0,255,0,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: 'green',
              color: 'white'
            }}>Cardings</Item>
            <ScoreboardTwoToneIcon
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
                backgroundColor: 'rgba(0,255,0,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: 'green',
              color: 'white'
            }}>Photo Gallery</Item>
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
        <a href="/Constitution">
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
                backgroundColor: 'rgba(0,255,0,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: 'green',
              color: 'white'
            }}>Club Constitution</Item>
            <ReceiptLongTwoToneIcon
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
        <a href="/Directions">
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
                backgroundColor: 'rgba(0,255,0,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: 'green',
              color: 'white'
            }}>Directions</Item>
            <AssistantDirectionTwoToneIcon
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
        <a href="/Contact">
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
                backgroundColor: 'rgba(0,255,0,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: 'green',
              color: 'white'
            }}>Contact Us</Item>
            <AlternateEmailTwoToneIcon
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
        <a href="/Popia">
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
                backgroundColor: 'rgba(0,255,0,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: 'green',
              color: 'white'
            }}>Popia Notice</Item>
            <PrivacyTipTwoToneIcon
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
                backgroundColor: 'rgba(0,255,0,0.1)'
              }}
            >
            <Item style={{
              position: 'relative',
              top: -75,
              width: 285,
              height: 50,
              fontSize: '1.5rem',
              backgroundColor: 'green',
              color: 'white'
            }}>Sign Up / Login</Item>
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
