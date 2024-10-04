import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AutoGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={2.5}>
          <Item 
            elevation={6}
            style={{ 
              height: '92vh',
              marginTop: '4px',
              marginLeft: '4px',
              marginRight: '0'
            }}>
          </Item>
        </Grid>
        <Grid item xs={7}>
          <Item 
            elevation={6}
            style={{ 
              height: '92vh',
              marginTop: '4px',
              marginLeft: '0',
              marginRight: '0',
              overflow: 'scroll',
              scrollBar: 'none'
            }}>
          </Item>
        </Grid>
        <Grid item xs={2.5}>
          <Item 
            elevation={6}
            style={{ 
              height: '92vh',
              marginTop: '4px',
              marginLeft: '0',
              marginRight: '4px'
            }}>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}