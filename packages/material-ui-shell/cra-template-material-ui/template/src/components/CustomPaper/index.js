import Paper from '@mui/material/Paper'
import { styled } from '@mui/material'

const CustomPaper = styled(Paper)(({ theme }) => {
  return {
    width: 'auto',
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
    [theme.breakpoints.up(620)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `18px 18px 18px`,
  }
})

export default CustomPaper
