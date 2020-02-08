import 'react-multi-carousel/lib/styles.css'
import AppBar from '@material-ui/core/AppBar'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Carousel from 'react-multi-carousel'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import Fade from '@material-ui/core/Fade'
import LockIcon from '@material-ui/icons/Lock'
import Paper from '@material-ui/core/Paper'
import Person from '../../components/Person/Person'
import React, { Component } from 'react'
import ResponsiveMenu from '../../containers/Menu/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import TrackVisibility from 'react-on-screen'
import Typography from '@material-ui/core/Typography'
import Videocam from '@material-ui/icons/Videocam'
import Zoom from '@material-ui/core/Zoom'
import axios from 'axios'
import grey from '@material-ui/core/colors/grey'
import messages_bs from './bs.json'
import messages_de from './de.json'
import messages_en from './en.json'
import messages_es from './es.json'
import messages_ru from './ru.json'
import moment from 'moment'
import parseLanguages, { formatMessage } from 'rmw-shell/lib/utils/localeTools'
import red from '@material-ui/core/colors/red'
import { Helmet } from 'react-helmet'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

const messageSources = {
  de: messages_de,
  bs: messages_bs,
  es: messages_es,
  en: messages_en,
  ru: messages_ru,
}

const match = parseLanguages(['en', 'es', 'bs', 'ru', 'de'], 'en')

const messages = messageSources[match]

const CustomFade = ({ children, timeout = 2000 }) => {
  return (
    <TrackVisibility once partialVisibility>
      {({ isVisible }) => (
        <Fade in={isVisible} timeout={timeout}>
          {children}
        </Fade>
      )}
    </TrackVisibility>
  )
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
    this.UberUns = React.createRef()
    this.UnserTeam = React.createRef()
    this.TopSchrauber = React.createRef()
    this.Top = React.createRef()
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      transparent: true,
      activities: [],
      favouriteUsers: [],
    }
  }
  scroll(ref) {
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

    try {
      this.setState({
        users: JSON.parse(localStorage.getItem('users')) || [],
        companies: JSON.parse(localStorage.getItem('companies')) || [],
      })
    } catch (error) {}

    try {
      const { data, status } = await axios.get(
        'https://react-most-wanted-dev.web.app/api/users?limit=5'
      )

      if (status === 200) {
        this.setState({
          favouriteUsers: data.users.reverse(),
        })

        localStorage.setItem('users', JSON.stringify(data.users))
      }
    } catch (error) {
      console.log('error', error)
    }

    try {
      const { data: feedsData, status: feedsStatus } = await axios.get(
        'https://schrauber.app/api/companies?limit=10'
      )

      if (feedsStatus === 200) {
        this.setState({
          activities: feedsData.companies.reverse(),
        })
        localStorage.setItem('companies', JSON.stringify(feedsData.companies))
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  render() {
    const { history } = this.props
    const { transparent } = this.state
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl)
    const sections = [
      {
        name: formatMessage(messages, 'companies'),
        onClick: () => this.scroll(this.UberUns),
      },
      {
        name: formatMessage(messages, 'new_users'),
        onClick: () => this.scroll(this.TopSchrauber),
      },
      {
        name: 'Anmelden',
        onClick: () => history.push('/signin'),
        icon: <LockIcon />,
      },
    ]
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
      },
      tablet: {
        breakpoint: { max: 1024, min: 601 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
      },
    }

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
            <title>SchrauberApp</title>
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
                  {formatMessage(messages, 'intro')}
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
                  {formatMessage(messages, 'signin')}
                </Button>
              </Zoom>
            </div>
            <div style={{ width: '100%', height: 460 }}>
              <div style={{ margin: 20 }}>
                <br />
                <br />

                <CustomFade>
                  <Typography variant="h4" color="secondary">
                    {formatMessage(messages, 'companies')}
                  </Typography>
                </CustomFade>

                <Divider style={{ width: '100%' }} />
                <br />
                <br />
                <CustomFade>
                  <div>
                    <Carousel
                      responsive={responsive}
                      showDots={false}
                      transitionDuration={500}
                      autoPlay
                      autoPlaySpeed={5000}
                      swipeable
                      removeArrowOnDeviceType={['tablet', 'mobile']}
                    >
                      {this.state.activities &&
                        this.state.activities.map(item => {
                          const {
                            title = '',
                            feed = '',
                            downloadURLs = [],
                            timestamp,
                            author = {},
                          } = item

                          return (
                            <div style={{ padding: 15 }}>
                              <Card
                                key={item.uid}
                                style={{
                                  width: '100%',
                                  //margin: 15,
                                  height: 400,
                                  maxWidth: 400,
                                  minWidth: 250,
                                  alignSelf: 'flex-start',
                                }}
                              >
                                <CardActionArea
                                  onClick={() => {
                                    history.push(`/signin`)
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    style={{ height: 140 }}
                                    image={
                                      (downloadURLs && downloadURLs[0]) ||
                                      './background.jpg'
                                    }
                                    title="Main image"
                                  />
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="h2"
                                    >
                                      {title}
                                    </Typography>
                                    <Typography
                                      noWrap
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                      style={{ width: 250 }}
                                    >
                                      {`${moment(timestamp).format(
                                        'DD.MM.YYYY HH:mm'
                                      )} ${author.displayName || ''}`}
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                                <CardActions style={{ padding: 15 }}>
                                  <Typography
                                    gutterBottom
                                    variant="body1"
                                    style={{ textAlign: 'justify' }}
                                  >
                                    {feed.substring(0, 150)}
                                    {feed && feed.length > 150 && '...'}
                                  </Typography>
                                </CardActions>
                              </Card>
                            </div>
                          )
                        })}
                    </Carousel>
                  </div>
                </CustomFade>
              </div>
            </div>
            <br />
            <br />
            <div style={{ margin: 20 }} ref={this.TopSchrauber}>
              <br />
              <br />
              <br />
              <Typography variant="h4" color="secondary">
                {formatMessage(messages, 'new_users')}
              </Typography>
              <Divider style={{ width: '100%' }} />
              <CustomFade>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 30,
                    flexWrap: 'wrap',
                  }}
                >
                  {this.state.favouriteUsers &&
                    this.state.favouriteUsers.map(item => {
                      return (
                        <Paper
                          style={{
                            textAlign: 'center',
                            paddingTop: '10px',
                            marginTop: '10px',
                            padding: 18,
                            minWidth: 280,
                          }}
                        >
                          <Person
                            id={item.id}
                            name={item.displayName}
                            label={item.levelName}
                            src={item.photoURL}
                          />
                          <br />
                          <Typography
                            variant="h4"
                            component="div"
                            color="secondary"
                          >
                            {item.points}
                          </Typography>
                        </Paper>
                      )
                    })}
                </div>
              </CustomFade>
            </div>

            <div style={{ width: '100%', height: '100%' }} ref={this.UberUns}>
              <div style={{ margin: 20 }}>
                <br />
                <br />

                <CustomFade>
                  <Typography variant="h4" color="secondary">
                    Über uns
                  </Typography>
                </CustomFade>

                <Divider style={{ width: '100%' }} />
                <CustomFade>
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
                      src="/sbrblg.jpg"
                      alt="sbrblg"
                      style={{
                        width: 'auto',
                        height: 300,
                        borderRadius: 10,
                      }}
                    />
                    <Typography
                      variant="body"
                      style={{
                        flex: 1,
                        margin: 8,
                        textAlign: 'justify',
                        maxWidth: 850,
                      }}
                    >
                      Wir sind zwei Kfz Techniker Meister die sich dachten „Hey
                      es gibt noch keine richtige Seite für uns Schrauber“ also
                      begannen wir im März 2017 mit der Facebook Seite
                      „Schrauberblog“ auf der wir auf lustiger Art und Weise auf
                      die Alltäglichen Probleme und Freuden eines Schraubers
                      eingehen. Das Schrauberblog Team besteht aus Marco und
                      Chris
                      <br />
                      <br />
                      Ich Chris, bin Jahrgang 1992, leidenschaftlicher
                      Motorradfahrer, Boxer und Schrauber. Ich begann meine
                      Lehre im Kfz Mechatroniker Handwerk im Jahr 2009 bei einem
                      VW/AUDI Autohaus. Nach der Lehre verließ ich meine
                      Heimatstadt und versuchte bei der Bundeswehr mein Glück zu
                      finden allerdings war dieser Weg aber für mich der
                      Falsche. Ich kehrte zu den Wurzeln zurück und begann
                      wieder als Kfz Mechatroniker zu arbeiten. Im Jahr 2015
                      begann ich mit der Meisterschule die ich ende 2016
                      erfolgreich abgeschlossen habe. Anfang 2017 gründete ich
                      mit meinem Kumpel den Schrauberblog Mein Lieblingsauto:
                      1973 Plymouth Duster 340cui
                      <br />
                      <br />
                      Ich Marco, bin Jahrgang 1990, liebe amerikanische Muscle
                      Cars, das Meer und das Reisen. Ich begann meine Lehre zum
                      Kfz Mechatroniker im Jahr 2010 bei einer freien Werkstatt
                      die auf Sportfahrzeuge, Rennfahrzeuge und Oldtimer
                      spezialisiert ist. Im Jahr 2015 habe ich die Meisterschule
                      begonnen und im April 2017 erfolgreich abgeschlossen.
                      Meine Lieblingsarbeiten in der Werkstatt sind
                      Restaurationen und Motorüberholungen. Ich habe Fahrzeuge
                      wie Porsche 908, 936, 911RS restauriert, Motoren von
                      Porsche und Ferrari zerlegt oder Rennmotoren von Nascar
                      Fahrzeugen überholt. Die coolsten Autos an denen ich bis
                      jetzt schrauben durfte waren z.B. Shelby Cobra 289,
                      Porsche 550 oder Toyota Camry Nascar. Mein Lieblingsauto:
                      1969 Dodge Charger R/T 440cui
                    </Typography>
                  </div>
                </CustomFade>
              </div>

              <div style={{ margin: 20 }} ref={this.UnserTeam}>
                <CustomFade>
                  <Typography variant="h4" color="secondary">
                    Unser Team
                  </Typography>
                </CustomFade>
                <Divider style={{ width: '100%' }} />

                <CustomFade>
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
                    <Person
                      id="babo"
                      name="We"
                      label="All of us"
                      src="babo.jpg"
                    />
                    <Person
                      id="chris"
                      name="You"
                      label="with you"
                      src="chris.jpeg"
                    />
                  </div>
                </CustomFade>
              </div>
              <br />
              <Divider style={{ width: '100%' }} />

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
                        'https://www.youtube.com/channel/UCmlSDHBfoHCm25k_wouXhbA',
                        '_blank'
                      )
                    }}
                    startIcon={
                      <Videocam
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
                {`© ${new Date().getFullYear()} Copyright: Schrauberblog.com! All Rights Reserved`}
              </AppBar>
            </div>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(LandingPage)
