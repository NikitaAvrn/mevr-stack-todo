const express = require('express')
const app = express()
const cors = require('cors')
const config = require('config')

app.use(cors())
app.use(express.json())

app.use('/api/todo', require('./routes/todo.route'))

const dbo = require('./db/connection')
const PORT = config.get('port')

try {
  app.listen(PORT, () => {
    dbo.connectToServer((err) => {
      if(err) {
        console.log('Error connecting to DataBase. ', err)
      }
    })
  })
} catch (error) {
  console.log('Error on starting server. ', error)
  process.exit(1)
}