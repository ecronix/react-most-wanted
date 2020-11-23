import React, { useEffect } from 'react'
import { Form as FinalForm } from 'react-final-form'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useAuth } from 'base-shell/lib/providers/Auth'
import arrayMutators from 'final-form-arrays'

const FirebaseForm = ({
  uid,
  path = 'none',
  handleSubmit = () => {},
  Form,
  grants = {},
  formProps = {},
  initialValues = {},
  setSubmit,
}) => {
  const { watchPath, clearPath, getPath, firebaseApp } = usePaths()
  const { auth } = useAuth()
  const { isGranted = () => false } = auth || {}

  const databasePath = `${path}/${uid}`
  const data = getPath(databasePath) || initialValues

  useEffect(() => {
    if (uid) {
      watchPath(databasePath)
    }
    return () => clearPath(databasePath)
  }, [path, watchPath, clearPath, databasePath, uid])

  return (
    <FinalForm
      mutators={{ ...arrayMutators }}
      keepDirtyOnReinitialize
      onSubmit={async (values) => {
        let newUid = false

        console.log('values', values)

        if (uid) {
          await firebaseApp.database().ref(`${path}/${uid}`).update(values)
        } else {
          if (isGranted(auth, grants.create)) {
            const snap = await firebaseApp.database().ref(path).push(values)
            newUid = snap.key
          } else {
            return
          }
        }

        handleSubmit(values, newUid)
      }}
      initialValues={data}
      render={({ handleSubmit, ...rest }) => {
        if (setSubmit) {
          setSubmit(handleSubmit)
        }
        return <Form handleSubmit={handleSubmit} {...rest} {...formProps} />
      }}
    />
  )
}

export default FirebaseForm
