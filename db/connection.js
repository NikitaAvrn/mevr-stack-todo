const { MongoClient } = require('mongodb')
const config = require('config')
const client = new MongoClient(config.get('mongoUrl'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let _db

module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      if(db) {
        _db = db.db(config.get('dbName'))
        console.log('Successfully connected to MongoDB')
      }
      return callback(err)
    })
  },

  getDb: () => _db
}