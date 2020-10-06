import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'

const clean = o => {
  Object.keys(o).forEach(key => o[key] === undefined && delete o[key])
  return o
}

const getCreateValues = (values, props) => {
  const { handleCreateValues } = props

  if (handleCreateValues !== undefined && handleCreateValues instanceof Function) {
    return handleCreateValues(values)
  }

  return values
}

const getUpdateValues = (values, props) => {
  const { handleUpdateValues } = props

  if (handleUpdateValues !== undefined && handleUpdateValues instanceof Function) {
    return handleUpdateValues(values)
  }

  return values
}

class FireForm extends Component {
  state = { initialized: false }

  handleSubmit = values => {
    const { path, uid, firebaseApp, useFirestore } = this.props

    if (uid) {
      const updateValues = getUpdateValues(clean(values), this.props)
      if (updateValues) {
        if (useFirestore) {
          firebaseApp
            .firestore()
            .collection(path)
            .doc(uid)
            .update(updateValues)
        } else {
          firebaseApp
            .database()
            .ref()
            .child(`${path}${uid}`)
            .update(updateValues)
        }
      }
    } else {
      const createValues = getCreateValues(clean(values), this.props)

      if (createValues) {
        if (useFirestore) {
          firebaseApp
            .firestore()
            .collection(path)
            .doc()
            .set(createValues)
        } else {
          firebaseApp
            .database()
            .ref()
            .child(`${path}`)
            .push(createValues)
        }
      }
    }
  }

  componentDidMount() {
    const { path, uid, name, firebaseApp, initialize, useFirestore } = this.props

    if (uid) {
      if (useFirestore) {
        this.unsub = firebaseApp
          .firestore()
          .collection(path)
          .doc(uid)
          .onSnapshot(
            doc => {
              if (doc.exists) {
                this.setState({ initialized: true }, () => {
                  initialize(name, doc.data(), true)
                })
              }
            },
            err => {
              console.log(`Encountered error: ${err}`)
            }
          )
      } else {
        firebaseApp
          .database()
          .ref(`${path}${uid}`)
          .on('value', snapshot => {
            this.setState({ initialized: true }, () => {
              initialize(name, snapshot.val(), true)
            })
          })
      }
    } else {
      this.setState({ initialValues: {}, initialized: true })
    }
  }

  componentWillUnmount() {
    const { path, uid, firebaseApp } = this.props
    firebaseApp
      .database()
      .ref(`${path}${uid}`)
      .off()

    if (this.unsub) {
      this.unsub()
    }
  }

  render() {
    return React.Children.only(
      React.cloneElement(this.props.children, {
        onSubmit: this.handleSubmit,
        ...this.state,
        ...this.props
      })
    )
  }
}

FireForm.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  useFirestore: PropTypes.any,
  firebaseApp: PropTypes.any.isRequired,
  uid: PropTypes.string,
  onDelete: PropTypes.func,
  handleCreateValues: PropTypes.func,
  handleUpdateValues: PropTypes.func
}

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  { initialize }
)(FireForm)
