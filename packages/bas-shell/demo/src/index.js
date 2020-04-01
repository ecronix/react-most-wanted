import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

export default class Demo extends Component {
  render() {
    return <div>
      <h1>base-shell Demo</h1>
      <Example/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
