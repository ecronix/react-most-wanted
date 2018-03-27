import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { injectIntl, intlShape } from 'react-intl'
import { Activity } from 'rmw-shell'
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions'
import { withRouter } from 'react-router-dom'
import { withFirebase } from 'firekit-provider'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'
import List from 'react-virtualized/dist/commonjs/List'

class InfiniteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      values: {},
      pages: {}
    }
  }

  isRowLoaded = ({ index }) => {
    return !!this.state.list[index];
  }

  timeOutPromise = (ms) => {
    return new Promise(function (resolve, reject) {

      setTimeout(() => {
        resolve()
      }, ms);
    })
  }


  loadRows = (startIndex, stopIndex, calls = 0) => {
    const { firebaseApp } = this.props
    const { pages, list, values } = this.state


    console.log(`start ${startIndex} end ${stopIndex} calls ${calls} key ${pages[startIndex]}`)
    console.log(this.state)

    let newList = list
    let newPages = pages
    let newValues = values

    if (calls > 3) {
      return
    }

    console.log('Time out load. Calls', calls)

    let query

    if (startIndex !== 0 && pages[startIndex]) {
      query = firebaseApp.database().ref('users').orderByKey().startAt(pages[startIndex]).limitToFirst(stopIndex - startIndex + 1)
    } else if (startIndex === 0) {
      query = firebaseApp.database().ref('users').orderByKey().limitToFirst(stopIndex - startIndex + 1)
    } else {
      return this.timeOutPromise(2000).then(() => {
        return this.loadRows(startIndex, stopIndex, ++calls)
      })
    }

    return query.once('value', snapshot => {
      let index = 0
      let pageIndex = startIndex

      console.log('To load', stopIndex - startIndex)
      console.log('Loaded', snapshot.numChildren())

      snapshot.forEach((snap, i) => {
        index++
        pageIndex++

        if (snapshot.numChildren() !== index && newList.indexOf(snap.key) === -1) {
          newList.push(snap.key)
        } else if (newList.indexOf(snap.key) === -1 && (stopIndex - startIndex) > snapshot.numChildren()) {
          newList.push(snap.key)
        }

        newPages[pageIndex] = snap.key
        newValues[snap.key] = snap.val()

      })

      return this.setState({
        list: newList,
        pages: newPages,
        values: newValues
      })
    })

  }


  loadMoreRows = ({ startIndex, stopIndex }) => {

    return this.loadRows(startIndex, stopIndex)
  }

  rowRenderer = ({ key, index, style }) => {

    const { list, values } = this.state

    const uid = list[index] ? list[index] : ''
    const object = values[uid] ? values[uid] : {}


    return (
      <div
        key={key}
        style={{ ...style, color: 'white' }}
      >

        {index + 1} {!uid && 'Loading...'} {uid} {object.displayName}
      </div>
    )
  }

  render() {
    const { intl, muiTheme } = this.props
    const { values } = this.state

    const count = Object.keys(values).length + 30
    //const count = 99999999

    return (
      <Activity title={intl.formatMessage({ id: 'infinitelist' })}>

        <div style={{ color: 'red', fontSize: 30, padding: 20 }}>EXPERIMENTAL!!!</div>
        <div style={{ color: muiTheme.palette.textColor, fontSize: 30, padding: 20 }}>Trying to make Firebase RealtimeDatabase infinite list</div>

        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={count}
        >
          {({ onRowsRendered, registerChild }) => (
            <List
              height={400}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
              rowCount={count}
              rowHeight={20}
              rowRenderer={this.rowRenderer}
              width={700}
            />
          )}
        </InfiniteLoader>

      </Activity>
    )
  }
}

InfiniteList.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const { auth } = state

  return {
    auth
  }
}

export default connect(
  mapStateToProps,
  { setDialogIsOpen }
)(injectIntl(muiThemeable()(withRouter(withFirebase(InfiniteList)))))
