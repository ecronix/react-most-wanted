import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import cors from 'cors'
import express from 'express'

let whitelist = [
  'http://localhost:3000',
  'https://react-most-wanted.com',
  'https://www.react-most-wanted.com',
]

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
}

const app = express()
app.use(cors(corsOptions))
app.all('*', async (req, res) => {
  console.log('API call', req)
  console.log('API call body', req.body)
  console.log('API call method', req.method)
  console.log('API call query', req.query)

  if (req.method !== 'GET') {
    res.status(403).send('Forbidden!')
  }

  const { limit = 10 } = req.query

  if (limit > 20) {
    res.status(403).send('Forbidden! Limit ca´t be higher than 20')
  }

  const companies = []

  const userSnap = await admin
    .database()
    .ref(`companies`)
    .orderByKey()
    .limitToLast(parseInt(limit))
    .once('value')

  if (userSnap.exists()) {
    userSnap.forEach(snap => {
      companies.push({
        uid: snap.key,
        name: snap.child('name').val(),
        photoURL: snap.child('photoURL').val(),
        description: snap.child('description').val(),
      })
    })
  }

  res.set('Content-Type', 'application/json')

  res.status(200).send({ companies })
})

export default functions.https.onRequest(app)
