import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import Person from '@material-ui/icons/Person'
import Pause from '@material-ui/icons/Pause'
import PlayArrow from '@material-ui/icons/PlayArrow'
import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import moment from 'moment'
import { withTheme } from '@material-ui/core/styles'

export class AudioPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      playedSeconds: 0
    }
  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  toggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }
  setPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  onPlay = () => {
    this.setState({ playing: true })
  }
  onPause = () => {
    this.setState({ playing: false })
  }
  onSeekMouseDown = () => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  onEnded = () => {
    this.setState({ playing: this.state.loop })
  }
  onDuration = duration => {
    this.setState({ duration })
  }

  ref = player => {
    this.player = player
  }

  render() {
    const { src, authorPhotoUrl, theme } = this.props
    const { played, playedSeconds } = this.state

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={authorPhotoUrl} alt="person" icon={<Person />} />
        <IconButton onClick={this.state.playing ? this.onPause : this.onPlay}>
          {!this.state.playing && <PlayArrow color={'secondary'} />}
          {this.state.playing && <Pause color={'secondary'} />}
        </IconButton>
        <div
          style={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            width: 200
          }}
        >
          <LinearProgress variant="determinate" value={played * 100} color={'secondary'} />

          <div style={{ marginTop: 5, color: theme.palette.primary3Color }}>
            {moment()
              .month(0)
              .date(1)
              .hours(0)
              .minutes(0)
              .seconds(playedSeconds)
              .format('m:ss')}
          </div>
        </div>

        <ReactPlayer
          ref={this.ref}
          style={{ display: 'none' }}
          playing={this.state.playing}
          url={src}
          //onReady={() => console.log('onReady')}
          //onStart={() => console.log('onStart')}
          onPlay={this.onPlay}
          onPause={this.onPause}
          //onBuffer={() => console.log('onBuffer')}
          //onSeek={e => console.log('onSeek', e)}
          onEnded={this.onEnded}
          //onError={e => console.log('onError', e)}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
        />
      </div>
    )
  }
}

export default withTheme(AudioPlayer)
