import AppBar from '@material-ui/core/AppBar'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import LockIcon from '@material-ui/icons/Lock'
import React, { Component } from 'react'
import ResponsiveMenu from '../../containers/Menu/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Code from '@material-ui/icons/Code'
import Zoom from '@material-ui/core/Zoom'
import grey from '@material-ui/core/colors/grey'
import messages_de from './messages/de.json'
import messages_en from './messages/en.json'
import messages_bs from './messages/bs.json'
import messages_es from './messages/es.json'
import messages_ru from './messages/ru.json'
import messages_it from './messages/it.json'
import Person from '../../components/Person/Person'
import parseLanguages, {
  formatMessage as formatMessages,
} from 'rmw-shell/lib/utils/localeTools'
import red from '@material-ui/core/colors/red'
import { Helmet } from 'react-helmet'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import CustomFade from '../../components/CustomFade/CustomFade'
import PagePart from '../../components/LandingPage/PagePart'
import asyncComponent from '../../utils/asyncComponent'

const AsyncCompanies = asyncComponent(() =>
  import('../../containers/LandingPage/Companies')
)

const AsyncUsers = asyncComponent(() =>
  import('../../containers/LandingPage/Users')
)

const messageSources = {
  de: messages_de,
  bs: messages_bs,
  es: messages_es,
  en: messages_en,
  ru: messages_ru,
  it: messages_it,
}

const match = parseLanguages(['en', 'es', 'bs', 'ru', 'de', 'it'], 'en')

const messages = messageSources[match]

const formatMessage = uid => {
  return formatMessages(messages, uid)
}

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: {
      main: '#c62828',
    },
    error: red,
  },
})

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.companies = React.createRef()
    this.users = React.createRef()
    this.about = React.createRef()
    this.team = React.createRef()
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      transparent: true,
      users: [],
    }
  }

  scroll(ref) {
    ref &&
      ref.current &&
      ref.current.scrollIntoView({ behavior: 'smooth', alignToTop: true })
  }

  isAuthorised = () => {
    try {
      const key = Object.keys(localStorage).find(e => e.match(/persist:root/))
      const data = JSON.parse(localStorage.getItem(key))
      const auth = JSON.parse(data.auth)

      return auth && auth.isAuthorised
    } catch (ex) {
      return false
    }
  }

  handleScroll = e => {
    const { transparent } = this.state
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 50 && transparent) {
      this.setState({ ...this.state, transparent: false })
    }

    if (scrollTop <= 50 && !transparent) {
      this.setState({ transparent: true })
    }
  }

  async componentDidMount() {
    const { history } = this.props

    window.addEventListener('scroll', this.handleScroll)

    if (this.isAuthorised()) {
      history.push('/signin')
    }
  }

  render() {
    const { history } = this.props
    const { transparent } = this.state
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl)
    const sections = [
      {
        name: formatMessage('companies'),
        onClick: () => this.scroll(this.companies),
      },
      {
        name: formatMessage('new_users'),
        onClick: () => this.scroll(this.users),
      },
      {
        name: 'Anmelden',
        onClick: () => history.push('/signin'),
        icon: <LockIcon />,
      },
    ]

    const handleMobileMenuClose = () => {
      this.setState({ ...this.state, mobileMoreAnchorEl: null })
    }

    const handleMobileMenuOpen = event => {
      this.setState({ ...this.state, mobileMoreAnchorEl: event.currentTarget })
    }

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <Helmet>
            <meta name="theme-color" content={theme.palette.primary.main} />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content={theme.palette.primary.main}
            />
            <meta
              name="msapplication-navbutton-color"
              content={theme.palette.primary.main}
            />
            <title>React Most Wanted</title>
          </Helmet>
          <AppBar
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: transparent ? 'transparent' : undefined,
              boxShadow: transparent ? 'none' : undefined,
              transition: 'background 1s',
            }}
            position="static"
          >
            <Toolbar disableGutters>
              <div style={{ flex: 1 }} />
              <ResponsiveMenu
                sections={sections}
                transparent={transparent}
                isMobileMenuOpen={isMobileMenuOpen}
                handleMobileMenuClose={handleMobileMenuClose}
                handleMobileMenuOpen={handleMobileMenuOpen}
                statemobileMoreAnchorEl={this.state.mobileMoreAnchorEl}
              />
            </Toolbar>
          </AppBar>

          <div style={{ width: '100%', height: '100%' }}>
            <div
              style={{
                height: '100%',
                width: '100%',
                backgroundImage: 'url(background.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Zoom in={true} timeout={2000}>
                <img
                  src={'/rmw.svg'}
                  alt="logo"
                  style={{ height: 200, maxWidth: 360, color: 'red' }}
                />
              </Zoom>
              <Zoom in={true} timeout={2000}>
                <Typography
                  variant="h3"
                  align="center"
                  component="h1"
                  color="inherit"
                  gutterBottom
                  gutterTop
                  style={{ color: 'white', marginTop: 18, textAlign: 'center' }}
                >
                  REACT MOST WANTED
                </Typography>
              </Zoom>
              <Zoom in={true} timeout={2000}>
                <Typography
                  variant="h5"
                  component="h2"
                  color="inherit"
                  gutterBottom
                  style={{ color: 'white', textAlign: 'center' }}
                >
                  {formatMessage('intro')}
                </Typography>
              </Zoom>
              <Zoom in={true} timeout={2000}>
                <Button
                  style={{ margin: 30, borderRadius: '40px' }}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    try {
                      let sound = new Audio('prrprrSound.mp3')
                      sound.play()
                    } catch (error) {
                      console.warn(error)
                    }
                    history.push('/signin')
                  }}
                >
                  {formatMessage('try_it_out')}
                </Button>
              </Zoom>
            </div>

            <div ref={this.companies}>
              <PagePart title={formatMessage('companies')}>
                <AsyncCompanies history={history} />
              </PagePart>
            </div>

            <div ref={this.users}>
              <PagePart title={formatMessage('new_users')}>
                <AsyncUsers />
              </PagePart>
            </div>

            <PagePart title={formatMessage('about')}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  width: '100%',
                  height: '100%',
                  marginTop: 18,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <img
                  src="/rmw.svg"
                  alt="rmw"
                  style={{
                    width: 'auto',
                    height: 250,
                    borderRadius: 10,
                  }}
                />
                <Typography
                  variant="h6"
                  style={{
                    flex: 1,
                    margin: 8,
                    textAlign: 'justify',
                    maxWidth: 850,
                  }}
                >
                  {formatMessage('about_text')}
                </Typography>
              </div>
            </PagePart>

            <PagePart title={formatMessage('team')}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  width: '100%',
                  height: '100%',
                  marginTop: 30,
                  flexWrap: 'wrap',
                }}
              >
                <Person id="babo" name="We" label="All of us" src="/rmw.svg" />
                <Person id="chris" name="You" label="with you" src="/rmw.svg" />
              </div>
            </PagePart>

            <div
              style={{
                height: '400px',
                //width: '100%',
                backgroundImage: 'url(bottom.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <CustomFade>
                <Button
                  style={{
                    margin: 30,
                    borderRadius: '40px',
                  }}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    window.open(
                      'https://github.com/TarikHuber/react-most-wanted',
                      '_blank'
                    )
                  }}
                  startIcon={
                    <Code
                      style={{
                        color: 'white',
                        width: 40,
                        height: 40,
                      }}
                    />
                  }
                >
                  GitHub
                </Button>
              </CustomFade>
            </div>

            <Zoom in={!transparent} tiemout={2000}>
              <Fab
                color="secondary"
                onClick={() => {
                  window.scroll({ top: 0, left: 0, behavior: 'smooth' })
                }}
                style={{
                  position: 'fixed',
                  right: 8,
                  bottom: 55,
                  height: '50px',
                  width: '50px',
                }}
              >
                <ArrowUpward />
              </Fab>
            </Zoom>

            <AppBar
              position="relative"
              style={{
                withd: '100%',
                padding: 18,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
              }}
            >
              {`© ${new Date().getFullYear()} Copyright: yourcompany.com! All Rights Reserved`}
            </AppBar>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(LandingPage)
