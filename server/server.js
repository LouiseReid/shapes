const express = require('express')
const app = express()
const path = require('path')
const parser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const createRouter = require('./helpers/create_router')
const cors = require('cors')

// app.use(cors())
app.use(parser.json())

const publicPath = path.join(__dirname, '../client');
app.use(express.static(publicPath));


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if(err){
    console.log(err);
  }

  const db = client.db('layers')
  const shapes = db.collection('shapes')
  const shapesRouter = createRouter(shapes)
  app.use('/api/shapes', shapesRouter)

  app.listen(3001, function(){
    console.log(`app listening on port ${this.address().port}`);
  })
})
