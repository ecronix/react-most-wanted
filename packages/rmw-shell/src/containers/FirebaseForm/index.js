import React, { useEffect } from 'react'
import { Form as FinalForm } from 'react-final-form'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useAuth } from 'base-shell/lib/providers/Auth'
import arrayMutators from 'final-form-arrays'
import { getDatabase, ref, push, update } from 'firebase/database'

const FirebaseForm = ({
  uid,
  path = 'none',
  handleSubmit = () => {},
  Form,
  grants = {},
  formProps = {},
  initialValues = {},
  setSubmit,
  ...rest
}) => {
  const { watchPath, clearPath, getPath } = usePaths()
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

        if (uid) {
          await update(ref(getDatabase(), `${path}/${uid}`), values)
        } else {
          if (isGranted(auth, grants.create)) {
            const snap = await await push(ref(getDatabase(), path), values)
            newUid = snap.key
          } else {
            return
          }
        }

        handleSubmit(values, newUid)
      }}
      initialValues={data}
      render={({ handleSubmit, ...r }) => {
        if (setSubmit) {
          setSubmit(handleSubmit)
        }
        return <Form handleSubmit={handleSubmit} {...r} {...formProps} />
      }}
      {...rest}
    />
  )
}

export default FirebaseForm
