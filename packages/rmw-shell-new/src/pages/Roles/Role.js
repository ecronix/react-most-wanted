import React, { useEffect } from 'react'
import Page from 'material-ui-shell/lib/containers/Page'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useParams, useHistory } from 'react-router-dom'
import { Formik } from 'formik'

export default function () {
  const history = useHistory()
  const { uid } = useParams()
  console.log('uid', uid)
  const path = `roles/${uid}`
  const { watchPath, clearPath, getPath } = usePaths()

  useEffect(() => {
    watchPath(path)
    return () => clearPath(path)
  }, [path])

  const data = getPath(path)

  console.log('data', data)

  return (
    <Page
      onBackClick={() => {
        history.goBack()
      }}
      pageTitle={'Role'}
    >
      <div style={{ padding: 18 }}>
        <Formik
          enableReinitialize
          initialValues={data}
          onSubmit={(values, actions) => {
            console.log('values', values)
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
              />
              <br />
              <br />
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.description}
                name="description"
              />
              <br />
              <br />
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </div>
    </Page>
  )
}
