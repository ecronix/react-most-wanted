import React, { Component } from 'react'
import TrackVisibility from 'react-on-screen'

class AsyncComponent extends Component {
  state = {
    component: null,
  }

  componentDidMount() {
    const { load } = this.props
    load().then(cmp => {
      this.setState({ component: cmp.default })
    })
  }

  render() {
    const C = this.state.component
    return C ? <C {...this.props} /> : null
  }
}

const CustomLoad = ({ children, timeout = 2000, load }) => {
  return (
    <TrackVisibility once partialVisibility>
      {({ isVisible }) => (isVisible ? <AsyncComponent load={load} /> : null)}
    </TrackVisibility>
  )
}

export default CustomLoad
